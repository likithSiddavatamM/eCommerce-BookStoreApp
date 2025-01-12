// import React, { useState, useEffect } from "react";
// import "./Address.scss";
// import { fetchUserAddressApiCall, updateUserAddressApiCall, createUserAddressApiCall } from "../../Api";

// const Address = ({ onSelectAddress, selectedAddress }) => {
//   const [addressData, setAddressData] = useState([]);
//   const [editableIndex, setEditableIndex] = useState(null);
//   const [selectedType, setSelectedType] = useState("");
//   const [newAddress, setNewAddress] = useState({
//     mobileNumber: "",
//     address: "",
//     city: "",
//     state: "",
//   });
//   const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);
  
 
//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         console.log("Fetching user Address data...");
//         const addressdata = await fetchUserAddressApiCall();
//         if (addressdata.data.data.length > 0) {
//           setAddressData(addressdata.data.data);
//         }
//       } catch (error) {
//         console.error("Error fetching user Address data:", error);
//       }
//     };

//     fetchUserData();
//   }, []);

//   const handleEditClick = (index) => {
//     setEditableIndex(index);
//   };

//   const handleTypeChange = (e) => {
//     setSelectedType(e.target.value);
//   };
//   const handleInputChange = (index, field, value) => {
//     const updatedAddressData = [...addressData];
//     updatedAddressData[index][field] = value;
//     setAddressData(updatedAddressData);
//   };

//   const handleSaveClick = async (index) => {
//     try {
//       const updatedAddress = addressData[index];
//       console.log("Saving updated address:", updatedAddress);
//       await updateUserAddressApiCall(updatedAddress, addressData[index]._id);
//       setEditableIndex(null);
//     } catch (error) {
//       console.error("Error saving updated address:", error);
//     }
//   };

//   const handleNewAddressChange = (e) => {
//     const { name, value } = e.target;
//     setNewAddress((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleAddNewAddress = () => {
//     setIsAddingNewAddress(true);
//   };

//   const handleSaveNewAddress = async () => {
//     try {
//       console.log("Saving new address:", newAddress);
//       const createAddress = await createUserAddressApiCall(newAddress);
//       setIsAddingNewAddress(false);
//       setNewAddress({
//         mobileNumber: "",
//         address: "",
//         city: "",
//         state: "",
//       });
//       const addressdata = await fetchUserAddressApiCall();
//       setAddressData(addressdata.data.data);
//     } catch (error) {
//       console.error("Error saving new address:", error);
//     }
//   };

//   const handleSelectAddress = (address) => {
//     if (onSelectAddress && typeof onSelectAddress === 'function') {
//       onSelectAddress(address);
//     } else {
//       console.warn('onSelectAddress is not a function or is not provided');
//     }
//   };

//   return (
//     <>
//       <div className="profile-className-section">
//         <div className="profile-className-header">
//           <h2 className="profile-className-title">Address Details</h2>
//           <button
//             className="profile-className-add-btn"
//             onClick={handleAddNewAddress}
//           >
//             Add New Address
//           </button>
//         </div>
//       </div>

//       {isAddingNewAddress && (
//         <div className="Address-className-section">
//           <div className="Address-className-header">
//             <h2 className="Address-className-title">Add New Address</h2>
//             <button
//               className="Address-className-save-btn"
//               onClick={handleSaveNewAddress}
//             >
//               Save
//             </button>
//           </div>
//           <div className="Address-className-field">
//             <label>Mobile Number</label>
//             <input
//               type="tel"
//               name="mobileNumber"
//               value={newAddress.mobileNumber}
//               onChange={handleNewAddressChange}
//             />
//           </div>
//           <div className="Address-className-field">
//             <label>Address</label>
//             <textarea
//               name="address"
//               value={newAddress.address}
//               onChange={handleNewAddressChange}
//             ></textarea>
//           </div>
//           <div className="Address-className-fields">
//             <div className="Address-className-field">
//               <label>City/Town</label>
//               <input
//                 type="text"
//                 name="city"
//                 value={newAddress.city}
//                 onChange={handleNewAddressChange}
//               />
//             </div>
//             <div className="Address-className-field">
//               <label>State</label>
//               <input
//                 type="text"
//                 name="state"
//                 value={newAddress.state}
//                 onChange={handleNewAddressChange}
//               />
//             </div>
//           </div>
//           <div className="profile-className-section">
//         <h5 className="Address-className-title">Types</h5>
//         <div className="profile-className-radio-buttons">
//           <label className={`profile-className-radio-button ${selectedType === "home" ? "selected" : ""}`}>
//             <input
//               type="radio"
//               name="type"
//               value="home"
//               checked={selectedType === "home"}
//               onChange={handleTypeChange}
//             />
//             Home
//           </label>
//           <label className={`profile-className-radio-button ${selectedType === "work" ? "selected" : ""}`}>
//             <input
//               type="radio"
//               name="type"
//               value="work"
//               checked={selectedType === "work"}
//               onChange={handleTypeChange}
//             />
//             Work
//           </label>
//           <label className={`profile-className-radio-button ${selectedType === "other" ? "selected" : ""}`}>
//             <input
//               type="radio"
//               name="type"
//               value="other"
//               checked={selectedType === "other"}
//               onChange={handleTypeChange}
//             />
//             Other
//           </label>
//         </div>
//       </div>
//         </div>
//       )}

//       <div>
//         {addressData &&
//           addressData.length > 0 &&
//           addressData.map((address, index) => (
//             <div className="Address-className-section" key={index}>
//               <div className="Address-className-header">
//                 <div className="address-item">
//                   <input
//                     type="radio"
//                     id={`address-${address._id}`}
//                     name="selected-address"
//                     checked={selectedAddress && selectedAddress._id === address._id}
//                     onChange={() => handleSelectAddress(address)}
//                   />
//                   <label htmlFor={`address-${address._id}`} className="Address-className-title">
//                     {index + 1}. Address
//                   </label>
//                 </div>
//                 {editableIndex === index ? (
//                   <button
//                     className="Address-className-save-btn"
//                     onClick={() => handleSaveClick(index)}
//                   >
//                     Save
//                   </button>
//                 ) : (
//                   <button
//                     className="Address-className-edit-btn"
//                     onClick={() => handleEditClick(index)}
//                   >
//                     Edit
//                   </button>
//                 )}
//               </div>
//               <div className="address-details">
//                 <span className="Address-className-compact">
//                   {address.mobileNumber}, {address.address}, {address.city}, {address.state}
//                 </span>
//               </div>
//               {editableIndex === index && (
//                 <>
//                   <div className="Address-className-field">
//                     <label>Mobile Number</label>
//                     <input
//                       type="tel"
//                       value={address.mobileNumber}
//                       onChange={(e) =>
//                         handleInputChange(index, "mobileNumber", e.target.value)
//                       }
//                     />
//                   </div>
//                   <div className="Address-className-field">
//                     <label>Address</label>
//                     <textarea
//                       value={address.address}
//                       onChange={(e) =>
//                         handleInputChange(index, "address", e.target.value)
//                       }
//                     ></textarea>
//                   </div>
//                   <div className="Address-className-fields">
//                     <div className="Address-className-field">
//                       <label>City/Town</label>
//                       <input
//                         type="text"
//                         value={address.city}
//                         onChange={(e) =>
//                           handleInputChange(index, "city", e.target.value)
//                         }
//                       />
//                     </div>
//                     <div className="Address-className-field">
//                       <label>State</label>
//                       <input
//                         type="text"
//                         value={address.state}
//                         onChange={(e) =>
//                           handleInputChange(index, "state", e.target.value)
//                         }
//                       />
//                     </div>
//                   </div>
//                 </>
//               )}
//             </div>
//           ))}
//       </div>
//     </>
//   );
// };

// export default Address;



import React, { useState, useEffect } from "react";
import "./Address.scss";
import { fetchUserAddressApiCall, updateUserAddressApiCall, createUserAddressApiCall } from "../../Api";

const Address = ({ onSelectAddress, selectedAddress }) => {
  const [addressData, setAddressData] = useState([]);
  const [editableIndex, setEditableIndex] = useState(null);
  const [selectedType, setSelectedType] = useState("");
  const [newAddress, setNewAddress] = useState({
    mobileNumber: "",
    address: "",
    city: "",
    state: "",
  });
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);
  
 
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log("Fetching user Address data...");
        const addressdata = await fetchUserAddressApiCall();
        if (addressdata.data.data.length > 0) {
          setAddressData(addressdata.data.data);
        }
      } catch (error) {
        console.error("Error fetching user Address data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleEditClick = (index) => {
    setEditableIndex(index);
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };
  const handleInputChange = (index, field, value) => {
    const updatedAddressData = [...addressData];
    updatedAddressData[index][field] = value;
    setAddressData(updatedAddressData);
  };

  const handleSaveClick = async (index) => {
    try {
      const updatedAddress = addressData[index];
      console.log("Saving updated address:", updatedAddress);
      await updateUserAddressApiCall(updatedAddress, addressData[index]._id);
      setEditableIndex(null);
    } catch (error) {
      console.error("Error saving updated address:", error);
    }
  };

  const handleNewAddressChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddNewAddress = () => {
    setIsAddingNewAddress(true);
  };

  const handleSaveNewAddress = async () => {
    try {
      console.log("Saving new address:", newAddress);
      const createAddress = await createUserAddressApiCall(newAddress);
      setIsAddingNewAddress(false);
      setNewAddress({
        mobileNumber: "",
        address: "",
        city: "",
        state: "",
      });
      const addressdata = await fetchUserAddressApiCall();
      setAddressData(addressdata.data.data);
    } catch (error) {
      console.error("Error saving new address:", error);
    }
  };

  const handleSelectAddress = (address) => {
    if (onSelectAddress && typeof onSelectAddress === 'function') {
      onSelectAddress(address);
    } else {
      console.warn('onSelectAddress is not a function or is not provided');
    }
  };

  return (
    <>
      <div className="profile-className-section">
        <div className="profile-className-header">
          <h2 className="profile-className-title">Address Details</h2>
          <button
            className="profile-className-add-btn"
            onClick={handleAddNewAddress}
          >
            Add New Address
          </button>
        </div>
      </div>

      {isAddingNewAddress && (
        <div className="Address-className-section">
          <div className="Address-className-header">
            <h2 className="Address-className-title">Add New Address</h2>
            <button
              className="Address-className-save-btn"
              onClick={handleSaveNewAddress}
            >
              Save
            </button>
          </div>
          <div className="Address-className-field">
            <label>Mobile Number</label>
            <input
              type="tel"
              name="mobileNumber"
              value={newAddress.mobileNumber}
              onChange={handleNewAddressChange}
            />
          </div>
          <div className="Address-className-field">
            <label>Address</label>
            <textarea
              name="address"
              value={newAddress.address}
              onChange={handleNewAddressChange}
            ></textarea>
          </div>
          <div className="Address-className-fields">
            <div className="Address-className-field">
              <label>City/Town</label>
              <input
                type="text"
                name="city"
                value={newAddress.city}
                onChange={handleNewAddressChange}
              />
            </div>
            <div className="Address-className-field">
              <label>State</label>
              <input
                type="text"
                name="state"
                value={newAddress.state}
                onChange={handleNewAddressChange}
              />
            </div>
          </div>
          <div className="profile-className-section">
        <h5 className="Address-className-title">Types</h5>
        <div className="profile-className-radio-buttons">
          <label className={`profile-className-radio-button ${selectedType === "home" ? "selected" : ""}`}>
            <input
              type="radio"
              name="type"
              value="home"
              checked={selectedType === "home"}
              onChange={handleTypeChange}
            />
            Home
          </label>
          <label className={`profile-className-radio-button ${selectedType === "work" ? "selected" : ""}`}>
            <input
              type="radio"
              name="type"
              value="work"
              checked={selectedType === "work"}
              onChange={handleTypeChange}
            />
            Work
          </label>
          <label className={`profile-className-radio-button ${selectedType === "other" ? "selected" : ""}`}>
            <input
              type="radio"
              name="type"
              value="other"
              checked={selectedType === "other"}
              onChange={handleTypeChange}
            />
            Other
          </label>
        </div>
      </div>
        </div>
      )}

      <div>
        {addressData &&
          addressData.length > 0 &&
          addressData.map((address, index) => (
            <div className="Address-className-section" key={index}>
              <div className="Address-className-header">
                <div className="address-item">
                  <input
                    type="radio"
                    id={`address-${address._id}`}
                    name="selected-address"
                    checked={selectedAddress && selectedAddress._id === address._id}
                    style={{background:"white", outline: "none", border: "none"}}
                    onChange={() => handleSelectAddress(address)}
                  />
                  <label htmlFor={`address-${address._id}`} className="Address-className-title">
                    {index + 1}. Address
                  </label>
                </div>
                {editableIndex === index ? (
                  <button
                    className="Address-className-save-btn"
                    onClick={() => handleSaveClick(index)}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="Address-className-edit-btn"
                    onClick={() => handleEditClick(index)}
                  >
                    Edit
                  </button>
                )}
              </div>
              <div className="address-details">
                <span className="Address-className-compact">
                  {address.mobileNumber}, {address.address}, {address.city}, {address.state}
                </span>
              </div>
              {editableIndex === index && (
                <>
                  <div className="Address-className-field">
                    <label>Mobile Number</label>
                    <input
                      type="tel"
                      value={address.mobileNumber}
                      onChange={(e) =>
                        handleInputChange(index, "mobileNumber", e.target.value)
                      }
                    />
                  </div>
                  <div className="Address-className-field">
                    <label>Address</label>
                    <textarea
                      value={address.address}
                      onChange={(e) =>
                        handleInputChange(index, "address", e.target.value)
                      }
                    ></textarea>
                  </div>
                  <div className="Address-className-fields">
                    <div className="Address-className-field">
                      <label>City/Town</label>
                      <input
                        type="text"
                        value={address.city}
                        onChange={(e) =>
                          handleInputChange(index, "city", e.target.value)
                        }
                      />
                    </div>
                    <div className="Address-className-field">
                      <label>State</label>
                      <input
                        type="text"
                        value={address.state}
                        onChange={(e) =>
                          handleInputChange(index, "state", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
      </div>
    </>
  );
};

export default Address;