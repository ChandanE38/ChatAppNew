import {useState} from 'react'
import toast from 'react-hot-toast';


const useSignup = () => {
    const [loading , setLoading] = useState(false);
    
    const signup = async({ FullName,Username, Password, ConfirmPassword, gender})=> {
       const success=handleInputErrors({FullName,Username, Password, ConfirmPassword, gender})

       //if the success then return this function handleInputErrors;
       if(!success) return;

       setLoading(true);
       
       try{
            const res = await fetch("http://localhost:5000/api/auth/Signup",{
                method:"POST",
                headers:{"content-Type":"application/json"},
                body:JSON.stringify({FullName,Username, Password, ConfirmPassword, gender})
            })

            const data = await res.json();
            console.log(data);
       }catch{
            toast.error(error.message)
       }finally{
        setLoading(false);
       }

    }
    return { loading , signup };
};

export default useSignup;


function handleInputErrors({FullName,Username, Password, ConfirmPassword, gender}){
    if(!FullName || !Username || !Password || !ConfirmPassword || !gender){
        toast.error('Please fill in all fields')
        return false
    }

    if(Password!= ConfirmPassword){
        toast.error('Password do not match')
        return false
    }

    
    if(Password!= ConfirmPassword){
        toast.error('Password must be atleast 6 characters')
        return false
    }

    return true;
}