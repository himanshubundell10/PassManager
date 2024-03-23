export const savePass=(pass)=>{
        localStorage.setItem("myPass",JSON.stringify(pass));
  

};
// export const saveData=(data)=>{
//     localStorage.setItem("myPass",JSON.stringify(data))
// }

// export const getData=()=>{
//     const data=localStorage.getItem("myPass");
//     return data?JSON.parse(data):[];
// }

export const getPass=()=>{
    const pass=localStorage.getItem("myPass");
    return pass?JSON.parse(pass):[];
}





