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
    private String formTitle; //added
    private String titleSize; //added
    

    public Form(String formName, List<Section> sections, double version, String formTitle, String titleSize) {
        this.formName = formName;
        this.sections = sections;
        this.version = version;
        this.formTitle = formTitle;
        this.titleSize = titleSize;
    }

    public String getFormTitle() {
        return formTitle;
    }

    public void setFormTitle(String formTitle) {
        this.formTitle = formTitle;
    }

    public String getTitleSize() {
        return titleSize;
    }

    public void setTitleSize(String titleSize) {
        this.titleSize = titleSize;
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
            private String elementOrientation;
            private int size;
            private List<OptionObject> options;
            

            // getters and setters
            public RowElement(String elementName, String elementHeader, String placeholder, String placeholderPosition, String elementType, String elementOrientation, int size, List<OptionObject> options) {
            this.elementName = elementName;
            this.elementHeader = elementHeader;
            this.placeholder = placeholder;
            this.placeholderPosition = placeholderPosition;
            this.elementType = elementType;
            this.elementOrientation = elementOrientation;
            this.size = size;
            this.options = options;
            }
                

            public RowElement(String elementName, String elementHeader, String placeholder, String placeholderPosition,
                    String elementType) {
                this.elementName = elementName;
                this.elementHeader = elementHeader;
                this.placeholder = placeholder;
                this.placeholderPosition = placeholderPosition;
                this.elementType = elementType;
            }



            public RowElement(String elementName, String elementHeader, String elementType, String elementOrientation,
                    int size, List<OptionObject> options) {
                this.elementName = elementName;
                this.elementHeader = elementHeader;
                this.elementType = elementType;
                this.elementOrientation = elementOrientation;
                this.size = size;
                this.options = options;
            }

            public RowElement() {
                // Default constructor
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
            
            public List<OptionObject> getOptions() {
                return options;
            }

            public void setOptions(List<OptionObject> options) {
                this.options = options;
            }
            
            public String getElementOrientation() {
                return elementOrientation;
            }

            public void setElementOrientation(String elementOrientation) {
                this.elementOrientation = elementOrientation;
            }

            public static class OptionObject{
                public String optionType;
                public String optionName;
                public String optionValue;
                public textVariables textVariables;

                public OptionObject(String optionType, String optionName, String optionValue,
                textVariables textVariables) {
                    this.optionType = optionType;
                    this.optionName = optionName;
                    this.optionValue = optionValue;
                    this.textVariables = textVariables;
                }

                public OptionObject(String optionType, String optionName, String optionValue) {
                    this.optionType = optionType;
                    this.optionName = optionName;
                    this.optionValue = optionValue;
                }

                public OptionObject(){
                }

                public String getOptionType() {
                    return optionType;
                }

                public void setOptionType(String optionType) {
                    this.optionType = optionType;
                }

                public String getOptionName() {
                    return optionName;
                }

                public void setOptionName(String optionName) {
                    this.optionName = optionName;
                }

                public String getOptionValue() {
                    return optionValue;
                }

                public void setOptionValue(String optionValue) {
                    this.optionValue = optionValue;
                }

                public textVariables getTextVariables() {
                    return textVariables;
                }

                public void setTextVariables(textVariables textVariables) {
                    this.textVariables = textVariables;
                }

                public static class textVariables{
                    public String header;
                    public String hintPosition;
                    public String hintText;

                    public textVariables(String header, String hintPosition, String hintText) {
                        this.header = header;
                        this.hintPosition = hintPosition;
                        this.hintText = hintText;
                    }
                    
                    public String getHeader() {
                        return header;
                    }

                    public void setHeader(String header) {
                        this.header = header;
                    }

                    public String getHintPosition() {
                        return hintPosition;
                    }

                    public void setHintPosition(String hintPosition) {
                        this.hintPosition = hintPosition;
                    }

                    public String getHintText() {
                        return hintText;
                    }

                    public void setHintText(String hintText) {
                        this.hintText = hintText;
                    }
                }



            }



            
        }
    }
}

