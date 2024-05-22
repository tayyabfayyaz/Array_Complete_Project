import inquirer from 'inquirer';
import ListPrompt from 'inquirer/lib/prompts/list.js';


//      TYPE ALIAS USE HERE
type mainType =  {
    spliceSecondRange: number;
    spliceFirstRange: number;
    sliceSecondRange: number;
    sliceFirstRange: number;
    addLastQuestion: string;
    addQuestion: string;
    Question: string;
    confirmation: string;
    enterElement: string;
    selectionOfMethod: string;

    name: string;
    message: string;
    type: 'string' | 'number' | 'list' | 'input' | 'confirm';   // Here I used type literal method of Union...
    choices: [];
}

let arr: string[] = [];

async function mainMenu() {
    let methodList: mainType = await inquirer.prompt([
        {
            name: "selectionOfMethod",
            message: "Select any one...",
            type: "list",
            choices: [
                        "Enter Elements", 
                        "Delete First Element", 
                        "Delete Last Element", 
                        "Add First Element", 
                        "Add Last Element", 
                        "Slice Array", 
                        "Splice Array",
                        "Counts The Elements"
                    ]
        },
    ]);
    //          HERE USE SWITCH CASES
    switch (methodList.selectionOfMethod) {
        case "Enter Elements":
            await elementOfEntery();
            break;
            
            case "Delete First Element":
                await deleteFirstEntry();
                break;

            case "Delete Last Element":
                await deleteLastEntry();
                break;

            case "Add First Element":
                await addFirstElement();
                break;

            case "Add Last Element":
                await addLastElement();
                break;

            case "Slice Array":
                await sliceMethode();
                break;

            case "Splice Array":
                await spliceMethode();
                break;

            case "Counts The Elements":
                await lengthMethod();
                break;
            }
            
            let userSelection = await inquirer.prompt({
                name: "firstQuestion",
                message: "Do you want to select other option?",
                type: "confirm"
            });
            
            
            //      HERE USE if-else
            if(userSelection.firstQuestion){
                mainMenu();
            }else{
                console.log(`Please enter elements in array.`)
            }
        }// End of First Function
        
        //      HERE USE ASYNCHRONOUS FUNCTIONS
        //      Because asyc function accept the await 
        async function elementOfEntery() {
        let condition = true
        while(condition){
            let userEntry: mainType = await inquirer.prompt([
                {
                    name: "enterElement",
                    message: "Enter new element:",
                    type: "input"
                },
                {
                    name: "confirmation",
                    message: "You want to add more elements?",
                    type: "list",
                    choices: ["Yes", "No"]
                }
            ]);
            arr.push(userEntry.enterElement);
            if(userEntry.confirmation === "No"){
                condition = false;
                console.log(`Your Final Array is: ${arr}`);
            }
        }
    }// End of first Function
        
    mainMenu();
        
        
        async function deleteFirstEntry(){
                if(arr.length > 0){
                    let firstElementDeletion: mainType = await inquirer.prompt([
                        {
                            name: "Question",
                            message: "Do you want to delete first element?",
                            type: "list",
                            choices: ["Delete", "No"]
                        }
                    ]);
                    if(firstElementDeletion.Question === "Delete"){
                        arr.shift();
                        console.log(arr)
                    }else{
                        console.log(`Your final array is: ${arr}`);
                    }
                }else{
                    console.log(`${arr} your array is aiready empty!!`);
                }
}

async function deleteLastEntry(){
        if(arr.length > 0){
            let lastElementDeletion: mainType = await inquirer.prompt([
                {
                    name: "Question",
                    message: "Do you want to delete last element?",
                    type: "list",
                    choices: ["Delete", "No"]
                }
            ]);
            if(lastElementDeletion.Question === "Delete"){
                arr.pop();
                console.log(arr)
            }else{
                console.log(`Your final array is: ${arr}`);
            }
        }else{
            console.log(`${arr} your array is aiready empty!!`);
        }
}


async function addFirstElement() {
    let firstElementEntry: mainType = await inquirer.prompt([
        {
            name: "addQuestion",
            message: "Add an element at the start of array...",
            type: "input"
        }
    ]);
    arr.unshift(firstElementEntry.addQuestion);
    console.log(`Your Final Array List: \n ${arr}`);
}


async function addLastElement() {
    let lastElementEntry: mainType = await inquirer.prompt([
        {
            name: "addLastQuestion",
            message: "Add an element at the Last of array list...",
            type: "input",
        }
    ]);
    arr.push(lastElementEntry.addLastQuestion);
    console.log(`Your Final Array List: \n ${arr}`);
}


async function sliceMethode() {
    let sliceRanges: mainType = await inquirer.prompt([
        {
            name: "sliceFirstRange",
            message: "Enter First index number to cut and show you the array elements...",
            type: "number"
        },
        {
            name: "sliceSecondRange",
            message: "Enter Second index number to cut and show you the array elements...",
            type: "number"
        }
    ]);
    
    let result = arr.slice(sliceRanges.sliceFirstRange, sliceRanges.sliceSecondRange);
    console.log(result);
    console.log(arr);
};


async function spliceMethode() {
    let spliceRange: mainType = await inquirer.prompt([
        {
            name: "spliceFirstRange",
            message: "Enter first range no. to delete of elements...",
            type: "number"
        },
        {
            name: "spliceSecondRange",
            message: "Enter number how many elements you want to delete...",
            type: "number"
        }
    ]);

    let result = arr.splice(spliceRange.spliceFirstRange, spliceRange.spliceSecondRange);
    console.log(result);
    console.log(arr);
};


async function lengthMethod() {
    let result = arr.length;
    console.log(`Your competele element entry lenth is: ${result}`);
};

