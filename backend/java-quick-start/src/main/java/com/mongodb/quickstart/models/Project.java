package com.mongodb.quickstart.models;

import java.util.ArrayList;

public class Project {
    private String projectId;
    private String projectName;
    private ArrayList<AssignedForm> assignedForm;
    private String status;

    public Project(String projectName,ArrayList<AssignedForm> assignedForm,String status)
    {
        this.projectName = projectName;
        this.assignedForm = assignedForm;
        this.status = status;

        if(projectName.length()<4)
        {
            this.projectId = projectName.substring(0, 3);
        }
        else
        {
            this.projectId = projectName;
        }
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public ArrayList<AssignedForm> getAssignedForm() {
        return assignedForm;
    }

    public void setAssignedForm(ArrayList<AssignedForm> assignedForm) {
        this.assignedForm = assignedForm;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getProjectId() {
        return projectId;
    }

    public void setProjectId(String projectId) {
        this.projectId = projectId;
    }
    
}
