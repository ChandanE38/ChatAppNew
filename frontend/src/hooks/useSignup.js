import {useState} from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';


const useSignup = () => {
    const [loading , setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();
    
    const signup = async({ fullName,username, password, confirmPassword, gender})=> {
       const success=handleInputErrors({fullName,username, password, confirmPassword, gender})

    //    const {setAuthUser} = useAuthContext();

       //if the success then return this function handleInputErrors;
       if(!success) return;

       setLoading(true);
       
       try{
            const res = await fetch("http://localhost:5000/api/auth/Signup",{
                method:"POST",
                headers:{"content-Type":"application/json"},
                body:JSON.stringify({fullName,username, password, confirmPassword, gender})
            })

            const data = await res.json();
            console.log(data);

            if(data.error){
                throw new Error(data.error)
            }
            
            //set the user to the localStorage and then update the auth context values
            localStorage.setItem("chat-user",JSON.stringify(data))

            //context
            setAuthUser(data);

       }catch(error){
            toast.error(error.message)
       }finally{
        setLoading(false);
       }

    }
    return { loading , signup };
};

export default useSignup;


function handleInputErrors({fullName,username, password, confirmPassword, gender}){
    if(!fullName || !username || !password || !confirmPassword || !gender){
        toast.error('Please fill in all fields')
        return false
    }

    if(password!= confirmPassword){
        toast.error('Password do not match')
        return false
    }

    
    if(password!= confirmPassword){
        toast.error('Password must be atleast 6 characters')
        return false
    }

    return true;
}