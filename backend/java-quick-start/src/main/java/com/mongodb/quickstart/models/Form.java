package com.mongodb.quickstart.models;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "form_elements")
public class Form {
    @Id
    private String id;
    
    private String formName;
    private List<Section> sections;
    private double version;

    public Form(String formName, List<Section> sections, double version) {
        this.formName = formName;
        this.sections = sections;
        this.version = version;
    }

    // getters and setters

    public String getFormName() {
        return formName;
    }

    public void setFormName(String formName) {
        this.formName = formName;
    }

    public List<Section> getSections() {
        return sections;
    }

    public void setSections(List<Section> sections) {
        this.sections = sections;
    }

    public double getVersion() {
        return version;
    }

    public void setVersion(double version) {
        this.version = version;
    }

    // Section inner class
    public static class Section {
        private String sectionName;
        private String sectionText;
        private String sectionFont;
        private int numRows;
        private List<List<RowElement>> rowElements;
        
        // getters and setters

        public Section(String sectionName, String sectionText, String sectionFont, int numRows,
                List<List<RowElement>> rowElements) {
            this.sectionName = sectionName;
            this.sectionText = sectionText;
            this.sectionFont = sectionFont;
            this.numRows = numRows;
            this.rowElements = rowElements;
        }

        public String getSectionName() {
            return sectionName;
        }

        public void setSectionName(String sectionName) {
            this.sectionName = sectionName;
        }

        public String getSectionText() {
            return sectionText;
        }

        public void setSectionText(String sectionText) {
            this.sectionText = sectionText;
        }

        public String getSectionFont() {
            return sectionFont;
        }

        public void setSectionFont(String sectionFont) {
            this.sectionFont = sectionFont;
        }

        public int getNumRows() {
            return numRows;
        }

        public void setNumRows(int numRows) {
            this.numRows = numRows;
        }

        public List<List<RowElement>> getRowElements() {
            return rowElements;
        }

        public void setRowElements(List<List<RowElement>> rowElements) {
            this.rowElements = rowElements;
        }

        // RowElement inner class
        public static class RowElement {
            private String elementName;
            private String elementHeader;
            private String placeholder;
            private String placeholderPosition;
            private String elementType;
            private int size;
            private List<String> options;

            // getters and setters

            public RowElement(String elementName, String elementHeader, String placeholder, String placeholderPosition,
                    String elementType, int size, List<String> options) {
                this.elementName = elementName;
                this.elementHeader = elementHeader;
                this.placeholder = placeholder;
                this.placeholderPosition = placeholderPosition;
                this.elementType = elementType;
                this.size = size;
                this.options = options;
            }

            public String getElementName() {
                return elementName;
            }

            public void setElementName(String elementName) {
                this.elementName = elementName;
            }

            public String getElementHeader() {
                return elementHeader;
            }

            public void setElementHeader(String elementHeader) {
                this.elementHeader = elementHeader;
            }

            public String getPlaceholder() {
                return placeholder;
            }

            public void setPlaceholder(String placeholder) {
                this.placeholder = placeholder;
            }

            public String getPlaceholderPosition() {
                return placeholderPosition;
            }

            public void setPlaceholderPosition(String placeholderPosition) {
                this.placeholderPosition = placeholderPosition;
            }

            public String getElementType() {
                return elementType;
            }

            public void setElementType(String elementType) {
                this.elementType = elementType;
            }

            public int getSize() {
                return size;
            }

            public void setSize(int size) {
                this.size = size;
            }

            public List<String> getOptions() {
                return options;
            }

            public void setOptions(List<String> options) {
                this.options = options;
            }
        }
    }
}

