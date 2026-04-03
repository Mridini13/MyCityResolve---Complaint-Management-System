package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Complaint;
import com.example.demo.repository.ComplaintRepository;

@Service
public class ComplaintService {

    @Autowired
    private ComplaintRepository repo;

    public List<Complaint> getAllComplaints() {
        return repo.findAll();
    }

    public Complaint addComplaint(Complaint complaint) {
        complaint.setStatus("Pending");
        return repo.save(complaint);
    }

    public Complaint getComplaintById(Integer id) {
        return repo.findById(id).orElse(null);
    }

    public Complaint updateComplaintStatus(Integer id, Complaint updatedComplaint) {

        Complaint complaint = repo.findById(id).orElse(null);

        if (complaint != null) {
            complaint.setStatus(updatedComplaint.getStatus());
            return repo.save(complaint);
        }

        return null;
    }

    public void deleteComplaint(Integer id) {
        repo.deleteById(id);
    }
}
