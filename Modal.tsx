import React, {useState} from 'react'
import './Modal.css';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup"
import { toast } from 'react-toastify'

const Modal:React.FC<{closeModel:()=>void; addData:(data:any)=>void}>=({closeModel,addData})=>{

  const validationSchema = Yup.object().shape({
    airPortCode:Yup.string().required('This field is required'),
    name:Yup.string().required('This field  is required'),
    country:Yup.string().required('Country name is required'),
    state:Yup.string().required('Please enter state name '),
    city:Yup.string().required('please enter City name '),

  })
  const {register, handleSubmit, formState:{errors}}= useForm({
    resolver:yupResolver(validationSchema)
     });
 
    const [formData, setFormData] = useState({
      airPortCode: '',
        name: '',
        country: '',
        state: '',
        city: ''
      });

      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        
        setFormData({
          ...formData,
          [name]: value
        });
      };

      function onsubmit (formData:any)  {
      toast.success('Saved Successfully')
        addData(formData);
        closeModel();
      };
    
     
    return(
        <>      
        <div>
          <div className="modal-wrapper"></div>
            <form className='modal-form' onSubmit={handleSubmit(onsubmit)}>
            <h1>Please fill the Form</h1>

            <label htmlFor="airPortCode">AirPort Code :</label>
            <input type="text" {...register('airPortCode')}  onChange={handleInputChange} />
             {errors.airPortCode && <p className='form-text text-danger'>{errors.airPortCode.message?.toString()}</p>}
 

            <label htmlFor="name">Name :</label>
            <input type="text" {...register('name')} onChange={handleInputChange} /><br /><br />
            {errors.name && <p className='form-text text-danger'>{errors.name.message?.toString()}</p>}

            <label htmlFor="country">Country :</label>
            <input type="text" {...register('country')}  onChange={handleInputChange} /><br /><br />
            {errors.country && <p className='form-text text-danger'>{errors.country.message?.toString()}</p>}

            <label htmlFor="state">State :</label>
            <input type="text" {...register('state')}  onChange={handleInputChange} /><br /><br />
            {errors.state && <p className='form-text text-danger'>{errors.state.message?.toString()}</p>}

            <label htmlFor="city">City :</label>
            <input type="text" {...register('city')} onChange={handleInputChange}  /><br /><br />
            {errors.city && <p className='form-text text-danger'>{errors.city.message?.toString()}</p>}

            <button type='submit'className='modal-button ms-2' >Save</button>
            <button type='button' className='modal-button ms-2' onClick={closeModel}>Cancel</button>


            </form>

        </div>
        </>
    )
}
export default Modal;