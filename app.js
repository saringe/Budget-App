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

    var calculateSums = function (type){
        var sum = 0;

        data.allItems[type].forEach(function(curVal){ 
            sum += curVal.value;
        });

        data.totals[type] = sum;

    };


    var data = {
        allItems : {
            exp: [],
            inc: []
        },
        totals: {
            exp : 0,
            inc : 0
        },
        budget : 0,
        percentage : -1
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

        calculateBudget : function (){
            // Calculate the total income and expenses
            calculateSums('exp');
            calculateSums('inc');

            // Calculate the Budget : income - expenses
            data.budget = data.totals.inc - data.totals.exp;

            //Calculate the percentage of the income used
            if (data.totals.inc > 0){
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            }else {
                data.percentage = -1;
            }
            

        },

        getBudget : function (){
            return {
                budget : data.budget,
                totalIncome : data.totals.inc,
                totalExpense : data.totals.exp,
                percentage : data.percentage
            }
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
        inputButton : '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list'

    }

    return {
        getInput : function (){
            return {
                 type : document.querySelector(DOMStrings.inputType).value,
                 description : document.querySelector(DOMStrings.inputDescription).value,
                 value : parseFloat(document.querySelector(DOMStrings.inputValue).value)
            }
           
        }, 
        addListItem : function (obj, type){
            var html, newHtml, element;

            // Create HTML with a place holder

            if (type === 'inc'){
                element = DOMStrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'

            }else if(type === 'exp'){
                element = DOMStrings.expensesContainer;

                html =  '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }

            // Replace the placeHolder with input data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            // Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        clearFields : function (){
            var fieldsdata, fieldsarr;

            fieldsdata = document.querySelectorAll(DOMStrings.inputDescription + ', ' + DOMStrings.inputValue);
            fieldsarr = Array.prototype.slice.call(fieldsdata);

            fieldsarr.forEach(function (current, index, array){
                current.value = "";

            });

            fieldsarr[0].focus();

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

    var updateBudget = function (){
          // 1. calculate the budget
          budgetCtrl.calculateBudget();

          // 2. Return Budget
          var budget = budgetCtrl.getBudget();

          // 3. display the calculated budget
        console.log(budget);

    }

    
    var AddCtrlItem = function () {

        var  input, newItem;
         // 1. Get the input data
        input = UICtrl.getInput();

        if (input.description !== "" && input.value > 0 && !isNaN(input.value)){
             // 2. update the input item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);
            // 3. update the input item to the UI
            UICtrl.addListItem(newItem, input.type);

            // 4. Clear the fields
            UICtrl.clearFields();

            // 5. Calculate and Update the budget

            updateBudget();

        }
                
       
      
    }

    return {
        init : function (){
            eventlistenerSetUp();
        }
    };


})(budgetController, UIcontroller);

appController.init();