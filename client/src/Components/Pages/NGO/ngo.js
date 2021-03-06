import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Img from './download.png'
import { Container, Row,Col } from "react-bootstrap";
import "./ngo.css";
import firebase from '../../../firebase SDK/firebase';
import Ngoheader from '../../Ngoheader/Ngoheader';

import { Validator } from 'format-utils';
const initial = {
  ngoname:"",
  name: "",
  email: "",
  number: "",
  address: "",
 gender:"",
 ngoError:"",
  nameError: "",
  emailError: "",
  numberError: "",
  addressError: "" ,
};
let colors = ['orange', 'red', 'blue', 'purple'];
class NGO extends Component {
  state = {
    initial,
    items:null,
    Locations:false,
    selectedOption:null,
    progress:'',
    url:'',
    image:null,
    file:null
  };
  
  handlechange = (event) => {
    const isCheckbox = event.target.type === "checkbox";
    this.setState({
      [event.target.name]: isCheckbox
        ? event.target.checked
        : event.target.value,
    });
  };

  validate = () => {
    let ngoError = "";
    let nameError = "";
    let emailError = "";
    let numberError = "";
    let addressError = "";
   

    if (!this.state.ngoname) {
      ngoError = "NGO Name Cannot Be Blank";
    }

    if (!this.state.name) {
      nameError = "Name Cannot Be Blank";
    }
    if(this.state.email){
    if (!this.state.email.includes("@")) {
      emailError = "Invalid Email";
    }
  }else{
    emailError="Invalid Email"
  }
    if (!this.state.number) {
      numberError = "Number Cannot Be Blank";
    }
    if (!this.state.address) {
      addressError = "Address Cannot Be Blank";
    }
   
  
    if (emailError || nameError || numberError || addressError || ngoError ) {
      this.setState({ emailError, nameError, numberError, addressError,ngoError});
      return false;
    }
    return true;
  };
  imageUpload = e =>{
    let image;
    let fileTyped;
    if (e.target.files[0]) {
        image = e.target.files[0];
         fileTyped= URL.createObjectURL(e.target.files[0]);
        this.setState(() => ({ image }));
        this.setState({file:fileTyped});
      }  
 }
 newItemsData =()=>{ 
  const {image} = this.state;
  console.log(this.state.items)
   if(image != null){
     if(this.state.items!="Employment Type" && this.state.items!=null){
       if(Validator.mobile(this.state.number)){
      const uploadTask = firebase.storage().ref().child('UserPic/'+image.name).put(image);
      console.log(uploadTask)
      setTimeout(this.handleSubmit,1000);
       }else{
         alert("Please enter correct Phone number");
       }
     }else{
       alert("Please choose appropriate employment type");
     }
   }else{
     alert("Please Choose Profile Picture and Try again");
   }
 }
  handleChanged = (event) => {
    this.setState({
        items: event.target.value
    });
}
  handleOptionChange=(changeEvent) => {
    this.setState({
      selectedOption: changeEvent.target.value
    });
  }
  handleSubmit = (event) => {
    let obj;
    obj={
      ngoname:this.state.ngoname,
     Name:this.state.name,
     Email:this.state.email,
     Phone:this.state.number,
     Address:this.state.address,
     EmploymentType:this.state.items,
    Gender:this.state.selectedOption,
    }
    const isValid = this.validate();
    console.log(this.state.items);
        if (isValid) { 
          this.setState(initial);
          console.log(this.state);
          localStorage.setItem("NGOPhone",JSON.stringify(this.state.number));
          localStorage.setItem("NGOData",JSON.stringify(obj));
          window.location.href="http://localhost:3000/Ngoloan"
        }else{
alert("Not working");
        }
  };
  render() {
    return (
      <div >
     <Ngoheader />
      <div className="fullBox">
      <Container fluid className="headss top_mar">
        <Row className="col">
            <div className="sec">
              <h1>Applicant Form</h1>
              <h3 className="h3head">For Loan analysis </h3>
              <hr></hr>
            <div style={{position:'absolute',marginLeft:'95vh'}}>
            <img src= {this.state.file||Img} alt="pic" className="Cont" style={{width:"140px",height:"150px" }}/>
            <div className="upload-btn-wrapper">
           
            <input type="file" className="input-fileData" onChange={this.imageUpload} name="myfile" />
            </div>
            </div>
              <div >
              <select className="det drop" value={this.state.items} defaultValue="Employment Type" onChange={this.handleChanged}>
              <option value="Employment Type">Employment Type</option>
            <option value="Self Employed" >Self Employed</option>
            <option value="Unemployed" >Unemployed</option>
            <option value="Job" >Job</option>
            <option value="Farmer" >Farmer</option>
          </select>
          </div>
          <div className="error">{this.state.ngoError}</div>
              <input
                type="text"
                name="ngoname"
                className="det"
                placeholder="Enter NGO Name"
                value={this.state.ngoname}
                onChange={this.handlechange}
              ></input>
              <div className="error">{this.state.nameError}</div>
              <input
                type="text"
                name="name"
                className="det"
                placeholder="Enter Your Name"
                value={this.state.name}
                onChange={this.handlechange}
              ></input>
              
              <input
                type="text"
                name="email"
                className="det"
                placeholder="Enter Your Email"
                value={this.state.email}
                onChange={this.handlechange}
              ></input>


              <div className="error">{this.state.emailError}</div>
              <b className="optionhead labe">Gender :</b>
              <span className="genderbtn ">
              <label className="option opt" for="gender1">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={this.state.selectedOption ==='Male'}
                  onChange={this.handleOptionChange}
                  className="gender"
                ></input>
                  Male
                </label>
              </span>

              <span className="genderbtn2">
                <input type="radio" name="gender" value="Female" checked={this.state.selectedOption =='Female'}
                onChange={this.handleOptionChange}
                 className="gender"></input>
                <span className="option">Female</span>
              </span>
          <br></br>
              <input
                type="text"
                name="number"
                className="det"
                placeholder="Enter Your Phone No."
                maxLength={10}
                value={this.state.number}
                onChange={this.handlechange}
              ></input>
              <div className="error">{this.state.numberError}</div>
              <textarea
                type="text"
                name="address"
                className="det addss"
                placeholder="Enter Your Address"
                value={this.state.address}
                onChange={this.handlechange}
              ></textarea>
             <br></br>
              
              <br></br>
             
                <Button
                  type="submit"
                  className="button"
                  onClick={this.newItemsData}
                >
                  Submit
                </Button>
        
              
            </div>
        </Row>
      </Container>
      </div>
      </div>
    );
  }
}

export default NGO;
