package com.mongodb.quickstart.models;

import java.util.ArrayList;

public class Project {
    private ArrayList<AssignedForm> assignedForm;
    private String status;

    public Project(ArrayList<AssignedForm> assignedForm,String status)
    {
        
    }

    public ArrayList<AssignedForm> getAssignedForm() {
        return assignedForm;
    }

    public void setAssignedForm(ArrayList<AssignedForm> assignedForm) {
        this.assignedForm = assignedForm;
    }
}
