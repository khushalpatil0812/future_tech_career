"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2, Plus, UserCog } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { adminApi } from "@/lib/api";

export default function ResourceRequirementsPage() {
  const [requirements, setRequirements] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editingRequirement, setEditingRequirement] = useState<any | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    role: "",
    description: "",
    clientId: "",
    projectName: "",
    requiredCount: 1,
    fulfilledCount: 0,
    skillsRequired: "",
    experienceLevel: "",
    minExperience: 0,
    maxExperience: 0,
    location: "",
    budgetPerResource: 0,
    startDate: "",
    endDate: "",
    status: "open",
    priority: "medium",
    notes: "",
  });

  const fetchData = async () => {
    try {
      const [requirementsData, clientsData] = await Promise.all([
        adminApi.getResourceRequirements({ page: 0, size: 100, status: (filterStatus && filterStatus !== "all") ? filterStatus : undefined }),
        adminApi.getActiveClients()
      ]);
      setRequirements(requirementsData.content || requirementsData.items || []);
      setClients(clientsData);
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Failed to fetch data", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filterStatus]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingRequirement) {
        await adminApi.updateResourceRequirement(editingRequirement.id, formData);
        toast({ title: "Success", description: "Resource requirement updated successfully" });
      } else {
        await adminApi.createResourceRequirement(formData);
        toast({ title: "Success", description: "Resource requirement created successfully" });
      }
      setDialogOpen(false);
      setEditingRequirement(null);
      resetForm();
      fetchData();
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Operation failed", variant: "destructive" });
    }
  };

  const handleEdit = (requirement: any) => {
    setEditingRequirement(requirement);
    setFormData({
      role: requirement.role || "",
      description: requirement.description || "",
      clientId: requirement.client?.id || "",
      projectName: requirement.projectName || "",
      requiredCount: requirement.requiredCount || 1,
      fulfilledCount: requirement.fulfilledCount || 0,
      skillsRequired: requirement.skillsRequired || "",
      experienceLevel: requirement.experienceLevel || "",
      minExperience: requirement.minExperience || 0,
      maxExperience: requirement.maxExperience || 0,
      location: requirement.location || "",
      budgetPerResource: requirement.budgetPerResource || 0,
      startDate: requirement.startDate || "",
      endDate: requirement.endDate || "",
      status: requirement.status || "open",
      priority: requirement.priority || "medium",
      notes: requirement.notes || "",
    });
    setDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await adminApi.deleteResourceRequirement(deleteId);
      toast({ title: "Success", description: "Resource requirement deleted successfully" });
      setDeleteId(null);
      fetchData();
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Failed to delete resource requirement", variant: "destructive" });
    }
  };

  const resetForm = () => {
    setFormData({
      role: "",
      description: "",
      clientId: "",
      projectName: "",
      requiredCount: 1,
      fulfilledCount: 0,
      skillsRequired: "",
      experienceLevel: "",
      minExperience: 0,
      maxExperience: 0,
      location: "",
      budgetPerResource: 0,
      startDate: "",
      endDate: "",
      status: "open",
      priority: "medium",
      notes: "",
    });
  };

  const getFulfillmentProgress = (fulfilled: number, required: number) => {
    return (fulfilled / required) * 100;
  };

  const getPriorityBadge = (priority: string) => {
    const variants: any = {
      urgent: "destructive",
      high: "default",
      medium: "secondary",
      low: "outline",
    };
    return <Badge variant={variants[priority] || "secondary"}>{priority}</Badge>;
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Resource Requirements</h1>
        <Button onClick={() => { resetForm(); setDialogOpen(true); }}>
          <Plus className="mr-2 h-4 w-4" /> Add Requirement
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filter by Status</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger>
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="fulfilled">Fulfilled</SelectItem>
              <SelectItem value="partially_fulfilled">Partially Fulfilled</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
              <SelectItem value="on-hold">On Hold</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4">
        {requirements.map((req) => (
          <Card key={req.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-2">
                    <UserCog className="h-5 w-5" />
                    {req.role}
                  </CardTitle>
                  <div className="flex gap-2 mt-2">
                    <Badge>{req.status}</Badge>
                    {getPriorityBadge(req.priority)}
                    {req.experienceLevel && <Badge variant="outline">{req.experienceLevel}</Badge>}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(req)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => setDeleteId(req.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {req.client && <p className="font-medium">Client: {req.client.name}</p>}
                {req.projectName && <p>📋 Project: {req.projectName}</p>}
                {req.location && <p>📍 {req.location}</p>}
                {req.minExperience && req.maxExperience && (
                  <p>💼 {req.minExperience}-{req.maxExperience} years experience</p>
                )}
                {req.budgetPerResource && <p>💰 ${req.budgetPerResource.toLocaleString()} per resource</p>}
                
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Fulfillment</span>
                    <span>{req.fulfilledCount || 0} / {req.requiredCount || 1}</span>
                  </div>
                  <Progress value={getFulfillmentProgress(req.fulfilledCount || 0, req.requiredCount || 1)} />
                </div>

                {req.skillsRequired && (
                  <div className="mt-2">
                    <p className="text-sm font-medium">Skills:</p>
                    <p className="text-sm text-muted-foreground">{req.skillsRequired}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingRequirement ? "Edit Requirement" : "Add Requirement"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Role *</Label>
              <Input required value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} />
            </div>

            <div>
              <Label>Client *</Label>
              <Select required value={formData.clientId} onValueChange={(v) => setFormData({ ...formData, clientId: v })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select client" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>{client.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Project Name</Label>
              <Input value={formData.projectName} onChange={(e) => setFormData({ ...formData, projectName: e.target.value })} />
            </div>

            <div>
              <Label>Description</Label>
              <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Required Count</Label>
                <Input type="number" min="1" value={formData.requiredCount} onChange={(e) => setFormData({ ...formData, requiredCount: parseInt(e.target.value) || 1 })} />
              </div>
              <div>
                <Label>Fulfilled Count</Label>
                <Input type="number" min="0" value={formData.fulfilledCount} onChange={(e) => setFormData({ ...formData, fulfilledCount: parseInt(e.target.value) || 0 })} />
              </div>
            </div>

            <div>
              <Label>Skills Required</Label>
              <Textarea value={formData.skillsRequired} onChange={(e) => setFormData({ ...formData, skillsRequired: e.target.value })} />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Experience Level</Label>
                <Select value={formData.experienceLevel} onValueChange={(v) => setFormData({ ...formData, experienceLevel: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Entry">Entry</SelectItem>
                    <SelectItem value="Mid">Mid</SelectItem>
                    <SelectItem value="Senior">Senior</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Min Experience (years)</Label>
                <Input type="number" step="0.5" value={formData.minExperience} onChange={(e) => setFormData({ ...formData, minExperience: parseFloat(e.target.value) || 0 })} />
              </div>
              <div>
                <Label>Max Experience (years)</Label>
                <Input type="number" step="0.5" value={formData.maxExperience} onChange={(e) => setFormData({ ...formData, maxExperience: parseFloat(e.target.value) || 0 })} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Location</Label>
                <Input value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
              </div>
              <div>
                <Label>Budget Per Resource</Label>
                <Input type="number" step="0.01" value={formData.budgetPerResource} onChange={(e) => setFormData({ ...formData, budgetPerResource: parseFloat(e.target.value) || 0 })} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Start Date</Label>
                <Input type="date" value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} />
              </div>
              <div>
                <Label>End Date</Label>
                <Input type="date" value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Status</Label>
                <Select value={formData.status} onValueChange={(v) => setFormData({ ...formData, status: v })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="fulfilled">Fulfilled</SelectItem>
                    <SelectItem value="partially_fulfilled">Partially Fulfilled</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                    <SelectItem value="on-hold">On Hold</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Priority</Label>
                <Select value={formData.priority} onValueChange={(v) => setFormData({ ...formData, priority: v })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button type="submit">{editingRequirement ? "Update" : "Create"}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>This will permanently delete the resource requirement.</AlertDialogDescription>
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
