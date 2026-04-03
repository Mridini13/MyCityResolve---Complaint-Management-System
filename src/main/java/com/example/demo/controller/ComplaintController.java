package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.Complaint;
import com.example.demo.service.ComplaintService;

@RestController
@CrossOrigin(origins = "http://localhost:5174")
public class ComplaintController {

    @Autowired
    private ComplaintService service;

    @GetMapping("/complaints")
    public List<Complaint> getComplaints() {
        return service.getAllComplaints();
    }

    @PostMapping("/complaint")
    public Complaint addComplaint(@RequestBody Complaint complaint) {
        return service.addComplaint(complaint);
    }

    @GetMapping("/complaint/{id}")
    public Complaint getComplaintById(@PathVariable int id) {
        return service.getComplaintById(id);
    }

    @PutMapping("/complaint/{id}")
    public Complaint updateComplaintStatus(@PathVariable int id, @RequestBody Complaint updatedComplaint) {
        return service.updateComplaintStatus(id, updatedComplaint);
    }

    @DeleteMapping("/complaint/{id}")
    public String deleteComplaint(@PathVariable int id) {
        service.deleteComplaint(id);
        return "Complaint deleted successfully";
    }
}