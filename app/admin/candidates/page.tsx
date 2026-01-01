"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2, Plus, Users, FileText } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { adminApi } from "@/lib/api";

const INTERVIEW_STAGES = ["screening", "technical", "hr", "final", "offered", "rejected"];
const FINAL_STATUSES = ["in-progress", "selected", "rejected", "offered", "joined"];

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<any[]>([]);
  const [jobOpenings, setJobOpenings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [notesDialogOpen, setNotesDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editingCandidate, setEditingCandidate] = useState<any | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<any | null>(null);
  const [filterJobId, setFilterJobId] = useState<string>("");
  const [filterStage, setFilterStage] = useState<string>("");
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    resumeUrl: "",
    linkedinUrl: "",
    currentCompany: "",
    totalExperience: 0,
    skills: "",
    interviewStage: "screening",
    finalStatus: "in-progress",
    hrNotes: "",
    jobOpeningId: "",
  });

  const fetchData = async () => {
    try {
      const [candidatesData, jobsData] = await Promise.all([
        adminApi.getCandidates({ page: 0, size: 100, jobOpeningId: filterJobId || undefined, interviewStage: filterStage || undefined }),
        adminApi.getJobOpenings({ page: 0, size: 100, status: "open" })
      ]);
      setCandidates(candidatesData.content || candidatesData.items || []);
      setJobOpenings(jobsData.content || jobsData.items || []);
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Failed to fetch data", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filterJobId, filterStage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCandidate) {
        await adminApi.updateCandidate(editingCandidate.id, formData);
        toast({ title: "Success", description: "Candidate updated successfully" });
      } else {
        await adminApi.createCandidate(formData);
        toast({ title: "Success", description: "Candidate created successfully" });
      }
      setDialogOpen(false);
      setEditingCandidate(null);
      resetForm();
      fetchData();
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Operation failed", variant: "destructive" });
    }
  };

  const handleStageChange = async (candidateId: string, newStage: string) => {
    try {
      await adminApi.updateCandidateInterviewStage(candidateId, newStage);
      toast({ title: "Success", description: "Interview stage updated" });
      fetchData();
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Failed to update stage", variant: "destructive" });
    }
  };

  const handleNotesSubmit = async () => {
    if (!selectedCandidate) return;
    try {
      await adminApi.updateCandidateHRNotes(selectedCandidate.id, selectedCandidate.hrNotes || "");
      toast({ title: "Success", description: "HR notes updated" });
      setNotesDialogOpen(false);
      fetchData();
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Failed to update notes", variant: "destructive" });
    }
  };

  const handleEdit = (candidate: any) => {
    setEditingCandidate(candidate);
    setFormData({
      name: candidate.name || "",
      email: candidate.email || "",
      phone: candidate.phone || "",
      resumeUrl: candidate.resumeUrl || "",
      linkedinUrl: candidate.linkedinUrl || "",
      currentCompany: candidate.currentCompany || "",
      totalExperience: candidate.totalExperience || 0,
      skills: candidate.skills || "",
      interviewStage: candidate.interviewStage || "screening",
      finalStatus: candidate.finalStatus || "in-progress",
      hrNotes: candidate.hrNotes || "",
      jobOpeningId: candidate.jobOpening?.id || "",
    });
    setDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await adminApi.deleteCandidate(deleteId);
      toast({ title: "Success", description: "Candidate deleted successfully" });
      setDeleteId(null);
      fetchData();
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Failed to delete candidate", variant: "destructive" });
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      resumeUrl: "",
      linkedinUrl: "",
      currentCompany: "",
      totalExperience: 0,
      skills: "",
      interviewStage: "screening",
      finalStatus: "in-progress",
      hrNotes: "",
      jobOpeningId: "",
    });
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Candidate Pipeline</h1>
        <Button onClick={() => { resetForm(); setDialogOpen(true); }}>
          <Plus className="mr-2 h-4 w-4" /> Add Candidate
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Job Opening</Label>
              <Select value={filterJobId} onValueChange={setFilterJobId}>
                <SelectTrigger>
                  <SelectValue placeholder="All Jobs" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Jobs</SelectItem>
                  {jobOpenings.map((job) => (
                    <SelectItem key={job.id} value={job.id}>{job.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Interview Stage</Label>
              <Select value={filterStage} onValueChange={setFilterStage}>
                <SelectTrigger>
                  <SelectValue placeholder="All Stages" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Stages</SelectItem>
                  {INTERVIEW_STAGES.map((stage) => (
                    <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4">
        {candidates.map((candidate) => (
          <Card key={candidate.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    {candidate.name}
                  </CardTitle>
                  <div className="flex gap-2 mt-2">
                    <Badge>{candidate.interviewStage}</Badge>
                    <Badge variant="outline">{candidate.finalStatus}</Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => { setSelectedCandidate(candidate); setNotesDialogOpen(true); }}>
                    <FileText className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(candidate)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => setDeleteId(candidate.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p>📧 {candidate.email}</p>
                {candidate.phone && <p>📱 {candidate.phone}</p>}
                {candidate.currentCompany && <p>🏢 {candidate.currentCompany}</p>}
                {candidate.totalExperience && <p>💼 {candidate.totalExperience} years experience</p>}
                {candidate.jobOpening && <p className="font-medium">Position: {candidate.jobOpening.title}</p>}
                <div className="mt-4">
                  <Label>Update Stage:</Label>
                  <Select value={candidate.interviewStage} onValueChange={(v) => handleStageChange(candidate.id, v)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {INTERVIEW_STAGES.map((stage) => (
                        <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingCandidate ? "Edit Candidate" : "Add Candidate"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Name *</Label>
                <Input required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              </div>
              <div>
                <Label>Email *</Label>
                <Input required type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Phone</Label>
                <Input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
              </div>
              <div>
                <Label>Current Company</Label>
                <Input value={formData.currentCompany} onChange={(e) => setFormData({ ...formData, currentCompany: e.target.value })} />
              </div>
            </div>

            <div>
              <Label>Job Opening *</Label>
              <Select required value={formData.jobOpeningId} onValueChange={(v) => setFormData({ ...formData, jobOpeningId: v })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select job" />
                </SelectTrigger>
                <SelectContent>
                  {jobOpenings.map((job) => (
                    <SelectItem key={job.id} value={job.id}>{job.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Total Experience (years)</Label>
                <Input type="number" step="0.5" value={formData.totalExperience} onChange={(e) => setFormData({ ...formData, totalExperience: parseFloat(e.target.value) || 0 })} />
              </div>
              <div>
                <Label>Resume URL</Label>
                <Input value={formData.resumeUrl} onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })} />
              </div>
            </div>

            <div>
              <Label>LinkedIn URL</Label>
              <Input value={formData.linkedinUrl} onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })} />
            </div>

            <div>
              <Label>Skills</Label>
              <Textarea value={formData.skills} onChange={(e) => setFormData({ ...formData, skills: e.target.value })} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Interview Stage</Label>
                <Select value={formData.interviewStage} onValueChange={(v) => setFormData({ ...formData, interviewStage: v })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {INTERVIEW_STAGES.map((stage) => (
                      <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Final Status</Label>
                <Select value={formData.finalStatus} onValueChange={(v) => setFormData({ ...formData, finalStatus: v })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {FINAL_STATUSES.map((status) => (
                      <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button type="submit">{editingCandidate ? "Update" : "Create"}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={notesDialogOpen} onOpenChange={setNotesDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>HR Notes - {selectedCandidate?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              rows={6}
              value={selectedCandidate?.hrNotes || ""}
              onChange={(e) => setSelectedCandidate({ ...selectedCandidate, hrNotes: e.target.value })}
              placeholder="Add notes about the candidate..."
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setNotesDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleNotesSubmit}>Save Notes</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>This will permanently delete the candidate record.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
