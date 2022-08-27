import React, { Component } from 'react'




export default class ReactForm extends Component {
    state = {
        listDefault: [
            {
                id: '1',
                name: 'SV A',
                phone: '01',
                email: 'A@gmail.com',
            },
            {
                id: '2',
                name: 'SV B',
                phone: '02',
                email: 'B@gmail.com',
            },
            {
                id: '3',
                name: 'SV C',
                phone: '03',
                email: 'C@gmail.com',
            },
            {
                id: '4',
                name: 'SV AB',
                phone: '04',
                email: 'AB@gmail.com',
            },
            {
                id: '5',
                name: 'SV BC',
                phone: '05',
                email: 'BC@gmail.com',
            },
            {
                id: '6',
                name: 'SV AC',
                phone: '06',
                email: 'AC@gmail.com',
            },
        ],

        listSearch: [
            {
                id: '1',
                name: 'SV A',
                phone: '01',
                email: 'A@gmail.com',
            },
            {
                id: '2',
                name: 'SV B',
                phone: '02',
                email: 'B@gmail.com',
            },
            {
                id: '3',
                name: 'SV C',
                phone: '03',
                email: 'C@gmail.com',
            },
            {
                id: '4',
                name: 'SV AB',
                phone: '04',
                email: 'AB@gmail.com',
            },
            {
                id: '5',
                name: 'SV BC',
                phone: '05',
                email: 'BC@gmail.com',
            },
            {
                id: '6',
                name: 'SV AC',
                phone: '06',
                email: 'AC@gmail.com',
            },
        ],

        listShow: [
            {
                id: '1',
                name: 'SV A',
                phone: '01',
                email: 'A@gmail.com',
            },
            {
                id: '2',
                name: 'SV B',
                phone: '02',
                email: 'B@gmail.com',
            },
            {
                id: '3',
                name: 'SV C',
                phone: '03',
                email: 'C@gmail.com',
            },
            {
                id: '4',
                name: 'SV AB',
                phone: '04',
                email: 'AB@gmail.com',
            },
            {
                id: '5',
                name: 'SV BC',
                phone: '05',
                email: 'BC@gmail.com',
            },
            {
                id: '6',
                name: 'SV AC',
                phone: '06',
                email: 'AC@gmail.com',
            },
        ],

        sinhVien: {
            id: '',
            name: '',
            phone: '',
            email: '',
        },
        
        sinhVienInfo: {
            id: '',
            name: '',
            phone: '',
            email: '',
        },

        sinhVienEdit: {
            id: '',
            name: '',
            phone: '',
            email: '',
        },

        errors: {
            id: '',
            name: '',
            phone: '',
            email: '',
        }
    }
    //Render
    renderArrSinhVien = (data) => {
        return data.map((sv,index) =>{
            return (
                <tr key={index}>
                    <td>{sv.id}</td>
                    <td>{sv.name}</td>
                    <td>{sv.phone}</td>
                    <td>{sv.email}</td>
                    <td className='text-end'>
                        <button className='btn btn-danger mx-1' onClick={() =>{
                            this.delSinhVien(sv.id)
                        }}>Delete</button>
                        <button className='btn btn-primary mx-1' onClick={() => {
                            this.editSinhVien(sv)
                        }}>Edit</button>
                    </td>
                </tr>
            )
        })
    }
   
    createSinhVien = (newSinhVien) => {
        console.log('newSinhVien',newSinhVien);
        let arrSinhVienUpdate = this.state.listDefault;
        let sinhVien = this.state.sinhVien
        arrSinhVienUpdate.push(newSinhVien)
        this.setState({
            listDefault: arrSinhVienUpdate,
            listSearch: arrSinhVienUpdate,
            listShow: arrSinhVienUpdate,
            sinhVienInfo: sinhVien
        })
    }

    
    updateSinhVien = (sinhVienUpdate) => {
        let svUpdate = this.state.listDefault.find(sv => sv.id == sinhVienUpdate.id);
        let sinhVien = this.state.sinhVien
        if(svUpdate){
          for (let key in svUpdate){
            svUpdate[key] = sinhVienUpdate[key]
          }
        }
        this.setState({
          arrSinhVien: this.state.listDefault,
          listSearch: this.state.listDefault,
          listShow: this.state.listDefault,
          sinhVienInfo: sinhVien
        })
        console.log(sinhVienUpdate);
    }

    delSinhVien =(idClick) => {
        console.log('idClick',idClick);
        let arrSinhVienUpdate = this.state.listDefault
        arrSinhVienUpdate = arrSinhVienUpdate.filter(p => p.id !== idClick);
        this.setState ({
            listDefault: arrSinhVienUpdate,
            listSearch: arrSinhVienUpdate,
            listShow: arrSinhVienUpdate,
        })
    }

    editSinhVien = (svEdit) => {
        console.log(svEdit);
        this.setState({
          sinhVienInfo: svEdit
        })
      }

      


    handleChange = (e) =>{
        let {id,value} = e.target;
        let dataType = e.target.getAttribute('data-type');
        let newValue = { ...this.state.sinhVienInfo};
        newValue[id] = value;
        let newErrors = {...this.state.errors};
        let errorMess ='';
        if(value.trim() === ''){
            errorMess = id + ' Bạn chưa điền thông tin';
        } else {
            if(dataType == 'number'){
                let regexNumber = /^\d+$/;
                if(!regexNumber.test(value)){
                    errorMess =  id + ' phải là số!'
                }
            }
        }
        newErrors[id] = errorMess;
        this.setState({
            sinhVienInfo: newValue,
            errors:newErrors
        }, () =>{
        });

    }

    handleSubmit = (e) => {
        e.preventDefault();
        let valid = true;
        let {errors,sinhVienInfo} = this.state;
        for (let key in errors){
            if(errors[key] !== ''){
                valid = false;
                break;
            }
        };
        for(let key in sinhVienInfo){
            if(sinhVienInfo[key] === ''){
                errors[key] = key + ' không được bỏ trống!';
                valid = false;
            }
        };
        if(!valid){
            console.log(valid);
            this.setState({
                errors: errors
            })
            alert ('Dữ liệu không hợp lệ!');
            return;
        };
        this.createSinhVien(sinhVienInfo);
    }

    searchSinhVien = (e) => {
        let {value} = e.target;
        console.log('value',value);
        let listShow = [...this.state.listDefault]
        let listSearch = [...this.state.listDefault]
        let listDefault = [...this.state.listDefault]
        console.log('listShow',listShow);
        console.log('listSearch',listSearch);
        console.log('listDefault',listDefault);
        let resultSearch = listShow.filter((sv) => {
            return sv.name.toLowerCase().includes(value)
        })
        console.log('resultSearch = listShow',resultSearch);
        if (value === '') {
            this.setState({
                listShow: this.state.listSearch
            })
            console.log('value = rong, listShow: listSearch',this.state.listShow);
        } else {
            this.setState({
                
                listShow: resultSearch
               
            })
            console.log('tìm thấy nên listShow: resultSearch',this.state.listShow);
        }
        
    }
  render() {
  
    return (
      <div className='container'>
        <form className='form' onSubmit={this.handleSubmit}>
            <h3 className='text-start bg-dark text-white p-2 mt-1'>Thông Tin Sinh Viên</h3>
            <div className="row">
                <div className="col-6">
                    <div className="form-group text-start mt-2">
                        <p className='mb-0'>Mã sinh Viên</p>
                        <input value={this.state.sinhVienInfo.id} onChange={this.handleChange} className='w-100' type="number" id='id'name='id'/>
                        <p className='text-danger'>{this.state.errors.id}</p>
                    </div>
                    <div className="form-group text-start mt-2">
                        <p className='mb-0'>Số điện thoại</p>
                        <input value={this.state.sinhVienInfo.phone} onChange={this.handleChange} className='w-100' type="number" id='phone' name='phone'/>
                        <p className='text-danger'>{this.state.errors.phone}</p>
                    </div>
                </div>
                <div className="col-6">
                    <div className="form-group text-start mt-2">
                        <p className='mb-0'>Họ tên</p>
                        <input value={this.state.sinhVienInfo.name} onChange={this.handleChange} className='w-100' type="text" id='name' name='name'/>
                        <p className='text-danger'>{this.state.errors.name}</p>
                    </div>
                    <div className="form-group text-start mt-2">
                        <p className='mb-0'>Email</p>
                        <input value={this.state.sinhVienInfo.email} onChange={this.handleChange} className='w-100' type="email" id='email' name='email'/>
                        <p className='text-danger'>{this.state.errors.email}</p>
                    </div>
                </div>
            </div>
            <div className='text-start mt-3'>
                <button className="btn btn-success m-1">Thêm sinh viên</button>
                <button className="btn btn-warning m-1" type='button' onClick={() => {
                    this.updateSinhVien(this.state.sinhVienInfo)
                }}>Cập nhật</button>
            </div>
        </form>
        <div className="search">
            <form className="d-flex mt-3 mb-3">
                <input id='search_input' onChange={this.searchSinhVien} className="form-control me-2" type="search" placeholder="Tên Sinh viên" aria-label="Search" />
                <button id='search_button' className="btn btn-outline-success" type='button' >Search</button>
            </form>
        </div>
        <table className='table text-start mt-3'>
            <thead className='bg-dark text-white'>
                <tr>
                    <td>Mã sinh viên</td>
                    <td>Họ và Tên</td>
                    <td>Số điện thoại</td>
                    <td>Email</td>
                    <td></td>
                </tr>
            </thead>
            <tbody>
                {this.renderArrSinhVien(this.state.listShow)}
            </tbody>
        </table>
      </div>
    )
  }
}

