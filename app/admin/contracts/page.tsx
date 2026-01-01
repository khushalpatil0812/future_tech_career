"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2, Plus, FileText, AlertCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { adminApi } from "@/lib/api";

export default function ContractsPage() {
  const [contracts, setContracts] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [expiringContracts, setExpiringContracts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editingContract, setEditingContract] = useState<any | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    contractNumber: "",
    description: "",
    clientId: "",
    startDate: "",
    endDate: "",
    contractValue: 0,
    currency: "USD",
    status: "active",
    paymentTerms: "",
    documentUrl: "",
    terms: "",
    notes: "",
  });

  const fetchData = async () => {
    try {
      const [contractsData, clientsData, expiringData] = await Promise.all([
        adminApi.getContracts({ page: 0, size: 100 }),
        adminApi.getActiveClients(),
        adminApi.getExpiringContracts(30)
      ]);
      setContracts(contractsData.content || contractsData.items || []);
      setClients(clientsData);
      setExpiringContracts(expiringData);
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Failed to fetch data", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingContract) {
        await adminApi.updateContract(editingContract.id, formData);
        toast({ title: "Success", description: "Contract updated successfully" });
      } else {
        await adminApi.createContract(formData);
        toast({ title: "Success", description: "Contract created successfully" });
      }
      setDialogOpen(false);
      setEditingContract(null);
      resetForm();
      fetchData();
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Operation failed", variant: "destructive" });
    }
  };

  const handleEdit = (contract: any) => {
    setEditingContract(contract);
    setFormData({
      name: contract.name || "",
      contractNumber: contract.contractNumber || "",
      description: contract.description || "",
      clientId: contract.client?.id || "",
      startDate: contract.startDate || "",
      endDate: contract.endDate || "",
      contractValue: contract.contractValue || 0,
      currency: contract.currency || "USD",
      status: contract.status || "active",
      paymentTerms: contract.paymentTerms || "",
      documentUrl: contract.documentUrl || "",
      terms: contract.terms || "",
      notes: contract.notes || "",
    });
    setDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await adminApi.deleteContract(deleteId);
      toast({ title: "Success", description: "Contract deleted successfully" });
      setDeleteId(null);
      fetchData();
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Failed to delete contract", variant: "destructive" });
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      contractNumber: "",
      description: "",
      clientId: "",
      startDate: "",
      endDate: "",
      contractValue: 0,
      currency: "USD",
      status: "active",
      paymentTerms: "",
      documentUrl: "",
      terms: "",
      notes: "",
    });
  };

  const isExpiringSoon = (endDate: string) => {
    const days = Math.ceil((new Date(endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return days <= 30 && days >= 0;
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Contracts Management</h1>
        <Button onClick={() => { resetForm(); setDialogOpen(true); }}>
          <Plus className="mr-2 h-4 w-4" /> Add Contract
        </Button>
      </div>

      {expiringContracts.length > 0 && (
        <Card className="border-orange-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-600">
              <AlertCircle className="h-5 w-5" />
              Contracts Expiring Soon ({expiringContracts.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {expiringContracts.map((contract) => (
                <div key={contract.id} className="flex justify-between items-center p-2 border rounded">
                  <div>
                    <p className="font-medium">{contract.name}</p>
                    <p className="text-sm text-muted-foreground">Expires: {contract.endDate}</p>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => handleEdit(contract)}>View</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-4">
        {contracts.map((contract) => (
          <Card key={contract.id} className={isExpiringSoon(contract.endDate) ? "border-orange-300" : ""}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    {contract.name}
                  </CardTitle>
                  <div className="flex gap-2 mt-2">
                    <Badge variant={contract.status === "active" ? "default" : "secondary"}>{contract.status}</Badge>
                    {contract.contractNumber && <Badge variant="outline">{contract.contractNumber}</Badge>}
                    {isExpiringSoon(contract.endDate) && <Badge variant="destructive">Expiring Soon</Badge>}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(contract)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => setDeleteId(contract.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-1 text-sm">
                {contract.client && <p className="font-medium">Client: {contract.client.name}</p>}
                <p>📅 {contract.startDate} to {contract.endDate}</p>
                {contract.contractValue && <p>💰 {contract.currency} {contract.contractValue.toLocaleString()}</p>}
                {contract.paymentTerms && <p>📊 {contract.paymentTerms}</p>}
                {contract.description && <p className="text-muted-foreground mt-2">{contract.description.substring(0, 150)}...</p>}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingContract ? "Edit Contract" : "Add Contract"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Contract Name *</Label>
                <Input required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              </div>
              <div>
                <Label>Contract Number</Label>
                <Input value={formData.contractNumber} onChange={(e) => setFormData({ ...formData, contractNumber: e.target.value })} />
              </div>
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
              <Label>Description</Label>
              <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Start Date *</Label>
                <Input required type="date" value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} />
              </div>
              <div>
                <Label>End Date *</Label>
                <Input required type="date" value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Contract Value</Label>
                <Input type="number" step="0.01" value={formData.contractValue} onChange={(e) => setFormData({ ...formData, contractValue: parseFloat(e.target.value) || 0 })} />
              </div>
              <div>
                <Label>Currency</Label>
                <Select value={formData.currency} onValueChange={(v) => setFormData({ ...formData, currency: v })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                    <SelectItem value="INR">INR</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Payment Terms</Label>
              <Input value={formData.paymentTerms} onChange={(e) => setFormData({ ...formData, paymentTerms: e.target.value })} />
            </div>

            <div>
              <Label>Document URL</Label>
              <Input value={formData.documentUrl} onChange={(e) => setFormData({ ...formData, documentUrl: e.target.value })} />
            </div>

            <div>
              <Label>Terms</Label>
              <Textarea value={formData.terms} onChange={(e) => setFormData({ ...formData, terms: e.target.value })} />
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button type="submit">{editingContract ? "Update" : "Create"}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>This will permanently delete the contract.</AlertDialogDescription>
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
