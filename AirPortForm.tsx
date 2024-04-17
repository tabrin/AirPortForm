import React, { useState } from "react";
import Data from "./data.json";
import "./AirPortForm.css";
import Modal from "./Modal";
import { BsFillTrashFill, BsFillPencilFill } from 'react-icons/bs';
import { toast } from 'react-toastify'

const Form1: React.FC = () => {
  const [data, setData] = useState(Data);
  const [show, setShow] = useState(true);
  const [editIndex, setEditIndex] = useState<number | null>(null); 
  const [editData, setEditData] = useState<any>(null);
 
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (files) {
        setSelectedFile(files[0]);
      }
    };
  
    const handleUpload = async () => {
    
      if (selectedFile) {
        const formData = new FormData();
        formData.append('file', selectedFile, selectedFile.name);
  
        // Replace with the API endpoint
        const response = await fetch('http://localhost:3000/upload', {
          method: 'POST',
          body: formData,
        });
  
        if (response.ok) {
          
          toast.success('File has uploaded Successfully')
        } else {
         
         toast.warn('fail to upload file')
        }
      }
    };
  

  const closeModel = () => {
    setShow(false);
  };

  const addData = (newData: any) => {
    setData([...data, newData]);
  };

  const handleDelete = (targetIndex: number) => {
    const newData = data.filter((_, idx) => idx !== targetIndex);
    setData(newData);
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setEditData(data[index]);
  };

  const handleSaveEdit = (index: number, newData: any) => {
    const updatedData = [...data];
    updatedData[index] = newData; 
    setData(updatedData);
    setEditIndex(null);
    setEditData(null); 
  };

  const handleCancelEdit = () => {
    setEditIndex(null); 
    setEditData(null);
  };

  return (
    <>
      <div>
        <div>
          <p className="form-text text-center"><strong><h2>Add new Data</h2></strong></p>
        
          {show && <Modal closeModel={closeModel} addData={addData} />}
        </div>
        <table>
          <thead>
            <tr>
              <th>AirPort code</th>
              <th>Name</th>
              <th>Country</th>
              <th>State</th>
              <th>City</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.map((current, i) => {
              return (
                <tr key={i}>
                  <td>{current.airPortCode}</td>
                  <td>{current.name}</td>
                  <td>{current.country}</td>
                  <td>{current.state}</td>
                  <td>{current.city}</td>
                  <td>
                    {editIndex === i ? (
                      <>
                       <input type="text" value={editData.airPortCode} onChange={(e) => setEditData({...editData, airPortCode: e.target.value})} />
                        <input type="text" value={editData.name} onChange={(e) => setEditData({...editData, name: e.target.value})} />
                        <input type="text" value={editData.country} onChange={(e) => setEditData({...editData, country: e.target.value})} />
                        <input type="text" value={editData.state} onChange={(e) => setEditData({...editData, state: e.target.value})} />
                       <input type="text" value={editData.city} onChange={(e) => setEditData({...editData, city: e.target.value})} />
    
                        <button onClick={() => handleSaveEdit(i, editData)}>Save</button>
                        <button onClick={handleCancelEdit}>Cancel</button>
                      </>
                    ) : (
                      <span className="actions">
                        <BsFillTrashFill className="delete-btn" onClick={() => handleDelete(i)} />
                        <BsFillPencilFill className="edit-btn" onClick={() => handleEdit(i)} />
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div> 
           <button className="add-btn " onClick={() => setShow(true)}> Add </button><br />
          
      <input className="file-modal" type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

         </div>
      </div>
    </>
  );
};

export default Form1;
