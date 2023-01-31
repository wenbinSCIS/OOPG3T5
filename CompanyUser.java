import java.util.ArrayList;

public class CompanyUser extends User{
    private ArrayList<Form> form_list;

    public CompanyUser(String username,String password)
    {
        super(username, password);
        this.form_list = new ArrayList<Form>();
    }

    public ArrayList<Form> getFormList() 
    {
        return this.form_list;
    }

    public void AddFormToFormList(Form form)
    {
        this.form_list.add(form);
    }
}
