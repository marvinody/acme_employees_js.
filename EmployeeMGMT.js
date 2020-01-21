const employees = [
    { id: 1, name: 'moe'},
    { id: 2, name: 'larry', managerId: 1},
    { id: 4, name: 'shep', managerId: 2},
    { id: 3, name: 'curly', managerId: 1},
    { id: 5, name: 'groucho', managerId: 3},
    { id: 6, name: 'harpo', managerId: 5},
    { id: 8, name: 'shep Jr.', managerId: 4},
    { id: 99, name: 'lucy', managerId: 1}
  ];
  

  function findEmployeeByName(name, arr){
    let final = arr.filter(x => {
      if (x['name'] === name){
        return x
      }
    })

    return final[0]
  }


  function findManagerFor(employee, arr){
    let manager = employee['managerId']
   
   let final = arr.filter(x => {
         if (x['id'] === manager){
           return x
         }
       })
   
       return final[0]
     }
   
     function findCoworkersFor(employee, arr){
        let manager = employee['managerId']
        let currentID = employee['id']
      
        let final = arr.filter(x => {
            if (x['managerId'] === manager && x['id']!== currentID){
              return x
            }
          })
      
          return final
        }
      
        
  

        function findManagementChainForEmployee(employee, arr){
 
            let final = []  
            
                let baseCase = arr.filter(x => {
                  if (x['managerId'] === undefined){
                    return x['id']
                  }
                })[0]['name'];
            
            
              let check = employee['name']
                if (check === baseCase){
                  return final
                }
            
              
             let boss = findManagerFor(findEmployeeByName(employee['name'], arr), arr)
            
            
             let bossName = boss['name']
              final.push(boss)
               return final.concat(findManagementChainForEmployee(findEmployeeByName(bossName, arr), arr))            
             
            }

             function generateManagementTree(arr){
                let boss = 0
              let bossPos = arr.forEach(x => {
                if (x['managerId'] === undefined){
                 boss = arr.indexOf(x)
                }
              })
          
            let final =  arr.map(x => {
              x['reports'] = helper(arr, x['id'])
              return x
         })
         return final[boss]
         
                  }
            
    function helper (arr, id){
            return arr.filter(x => {
                  if (x['managerId'] === id){
                    return x
                  }
                })}
    

 function displayManagementTree(obj){
  
       let final = ''
         
      final += obj['name'] + '\n'
                                    
                  
      for (let key in obj){
       if (Array.isArray(obj[key])){
        obj[key].forEach(x => {
         return final += '-' + displayManagementTree(x)
         })
                        
     }
     }
   return final
    }
                  



  const spacer = (text)=> {
    if(!text){
      return console.log('');
    }
    const stars = new Array(5).fill('*').join('');
    console.log(`${stars} ${text} ${stars}`);
  }
  
  spacer('findEmployeeByName Moe')
  // given a name and array of employees, return employee
  console.log(findEmployeeByName('moe', employees));//{ id: 1, name: 'moe' }
  spacer('')
  
  spacer('findManagerFor Shep')
  //given an employee and a list of employees, return the employee who is the manager
  console.log(findManagerFor(findEmployeeByName('shep Jr.', employees), employees));//{ id: 4, name: 'shep', managerId: 2 }
  spacer('')
  
  spacer('findCoworkersFor Larry')
  
  //given an employee and a list of employees, return the employees who report to the same manager
  console.log(findCoworkersFor(findEmployeeByName('larry', employees), employees));/*
  [ { id: 3, name: 'curly', managerId: 1 },
    { id: 99, name: 'lucy', managerId: 1 } ]
  */
  
  spacer('');
  
  spacer('findManagementChain for moe')
  //given an employee and a list of employees, return a the management chain for that employee. The management chain starts from the employee with no manager with the passed in employees manager 
  console.log(findManagementChainForEmployee(findEmployeeByName('moe', employees), employees));//[  ]
  spacer('');
  
  spacer('findManagementChain for shep Jr.')
  console.log(findManagementChainForEmployee(findEmployeeByName('shep Jr.', employees), employees));/*
  [ { id: 1, name: 'moe' },
    { id: 2, name: 'larry', managerId: 1 },
    { id: 4, name: 'shep', managerId: 2 }]
  */
  spacer('');
  
  
  spacer('generateManagementTree')
  //given a list of employees, generate a tree like structure for the employees, starting with the employee who has no manager. Each employee will have a reports property which is an array of the employees who report directly to them.
  console.log(JSON.stringify(generateManagementTree(employees), null, 2));
  /*
  {
    "id": 1,
    "name": "moe",
    "reports": [
      {
        "id": 2,
        "name": "larry",
        "managerId": 1,
        "reports": [
          {
            "id": 4,
            "name": "shep",
            "managerId": 2,
            "reports": [
              {
                "id": 8,
                "name": "shep Jr.",
                "managerId": 4,
                "reports": []
              }
            ]
          }
        ]
      },
      {
        "id": 3,
        "name": "curly",
        "managerId": 1,
        "reports": [
          {
            "id": 5,
            "name": "groucho",
            "managerId": 3,
            "reports": [
              {
                "id": 6,
                "name": "harpo",
                "managerId": 5,
                "reports": []
              }
            ]
          }
        ]
      },
      {
        "id": 99,
        "name": "lucy",
        "managerId": 1,
        "reports": []
      }
    ]
  }
  */
  spacer('');
  
  spacer('displayManagementTree')
  //given a tree of employees, generate a display which displays the hierarchy
  console.log(displayManagementTree(generateManagementTree(employees)));/*
  moe
  -larry
  --shep
  ---shep Jr.
  -curly
  --groucho
  ---harpo
  -lucy
  */
  