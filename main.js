const formAdd = document.getElementById("form-add")
const personalFinance = document.getElementById("personal-finance")

const financeManage = () => {
    let financeList = []
    
    return {
        getData : function (){
            return financeList
        },
        addData : ({title,nominal, dates}) => financeList.push({
            title,nominal,dates
        }),
        deleteData : (id)=> {
             financeList = financeList.filter((data, index)=> index!= id)
        }
    }
}

const finance = financeManage();


const render = () => {
    let template = '';
                finance.getData().forEach((list,index)=> {
                    template += `<li data-id=${index}><span>${list.title} - ${list.nominal} - ${list.dates}</span> <a href="#">Delete</a></li>`
                })
                
                personalFinance.innerHTML = template
                const allDeleteButton = document.querySelectorAll("#personal-finance a")
        
        allDeleteButton.forEach((deleteButton) => {
            deleteButton.addEventListener("click", function(event){
                event.preventDefault();
                
                const id = deleteButton.parentElement.dataset.id;
                
                finance.deleteData(id)


               render()
            })
        })
}


if(formAdd){
    formAdd.addEventListener("submit", function(event){
        event.preventDefault();
        const formTitle = formAdd.elements["title"].value;
        const formNominal = "Rp. " + new Intl.NumberFormat("id-ID").format(formAdd.elements["nominal"].value);
        const formDates = new Intl.DateTimeFormat(["ban", "id"]).format(new Date(formAdd.elements["dates"].value));


        finance.addData({
            title :formTitle,
            nominal :formNominal,
            dates :formDates
        })
        
        render()
        
        
    })
}