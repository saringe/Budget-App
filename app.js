const budgetController = (function (){

    var Expense = function (id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function (id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };


    var data = {
        allItems : {
            exp: [],
            inc: []
        },
        totals: {
            exp : 0,
            inc : 0
        }
    };

    return {
        addItem : function (type, desc, val) {

            var newItem, ID;
            // Create new ID

            if (data.allItems[type].length > 0){
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }
            
            // Create new Item
            if (type === 'exp'){
                newItem = new Expense(ID, desc, val);
            } else if (type === 'inc'){
                newItem = new Income(ID, desc, val);
            }

            data.allItems[type].push(newItem);

            return newItem;
            
        },

        testing :  function() {
                console.log(data);
            }
        
    };
    
   
})();

const UIcontroller = (function (){

    var DOMStrings = {
        inputType : '.add__type',
        inputDescription : '.add__description',
        inputValue : '.add__value',
        inputButton : '.add__btn'
    }

    return {
        getInput : function (){
            return {
                 type : document.querySelector(DOMStrings.inputType).value,
                 description : document.querySelector(DOMStrings.inputDescription).value,
                 value : document.querySelector(DOMStrings.inputValue).value
            }
           
        }, 
        getDOMStrings : function (){
            return DOMStrings;
        }
    }

  
})();
 
const appController = (function (budgetCtrl, UICtrl){

    var eventlistenerSetUp = function (){
        var DOM = UICtrl.getDOMStrings();

        document.querySelector(DOM.inputButton).addEventListener('click', AddCtrlItem);

        document.addEventListener('keypress', function (event){
     
         if (event.keyCode === 13 || event.which === 13){
             AddCtrlItem();
         };
     
        });


    };

    
    var AddCtrlItem = function () {

        var  input, newItem;
         // 1. Get the input data
        input = UICtrl.getInput();
                
        // 2. update the input item to the budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);
        // 3. update the input item to the UI

        // 4. calculate the budget

        // 5. display the calculated budget
       
    }

    return {
        init : function (){
            eventlistenerSetUp();
        }
    };


})(budgetController, UIcontroller);

appController.init();