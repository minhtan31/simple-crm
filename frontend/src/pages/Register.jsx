import { useState } from "react";
import api from "../services/api";
import "./auth.css";


function Register() {


  const initialForm = {

    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",

  };


  const [form, setForm] = useState(initialForm);

  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);




  // =====================
  // HANDLE INPUT
  // =====================
  const handleChange = (e) => {


    const { name, value } = e.target;


    setForm({

      ...form,

      [name]: value

    });



    setErrors({

      ...errors,

      [name]: "",

      general: ""

    });


  };







  // =====================
  // VALIDATE
  // =====================
  const validate = () => {


    let err = {};




    // NAME

    if (!form.name.trim()) {

      err.name = "Vui lòng nhập họ tên";

    }
    else if (form.name.trim().length < 2) {

      err.name =
      "Tên phải có ít nhất 2 ký tự";

    }
    else if (!/^[a-zA-ZÀ-ỹ\s]+$/.test(form.name)) {

      err.name =
      "Tên chỉ được chứa chữ";

    }






    // EMAIL

    if (!form.email.trim()) {

      err.email =
      "Vui lòng nhập email";

    }
    else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/
      .test(form.email)
    ) {

      err.email =
      "Email không đúng định dạng";

    }






    // PHONE

    if (!form.phone.trim()) {

      err.phone =
      "Vui lòng nhập số điện thoại";

    }
    else if (
      !/^0[0-9]{9}$/
      .test(form.phone)
    ) {

      err.phone =
      "Số điện thoại phải đủ 10 số";

    }






    // PASSWORD

    if (!form.password) {

      err.password =
      "Vui lòng nhập mật khẩu";

    }
    else if(form.password.length < 8){

      err.password =
      "Mật khẩu tối thiểu 8 ký tự";

    }
    else if(
      !/(?=.*[A-Za-z])(?=.*[0-9])/
      .test(form.password)
    ){

      err.password =
      "Mật khẩu phải có chữ và số";

    }







    // CONFIRM PASSWORD

    if(!form.confirmPassword){


      err.confirmPassword =
      "Vui lòng nhập lại mật khẩu";


    }
    else if(
      form.password !== form.confirmPassword
    ){

      err.confirmPassword =
      "Mật khẩu không khớp";

    }





    setErrors(err);


    return Object.keys(err).length === 0;


  };









  // =====================
  // SUBMIT
  // =====================
  const handleSubmit = async(e)=>{


    e.preventDefault();



    if(!validate()) return;




    setLoading(true);



    try{


      await api.post("/auth/register",{


        name: form.name,

        email: form.email,

        phone: form.phone,

        password: form.password


      });





      alert(
        "Đăng ký thành công"
      );



      setForm(initialForm);



      window.location.href="/login";





    }
    catch(error){



      const data =
      error.response?.data;



      // EMAIL TRÙNG

      if(
        data?.field === "email"
      ){


        setErrors({

          email:
          data.message ||
          "Email đã tồn tại"


        });


      }



      // lỗi field khác

      else if(data?.field){


        setErrors({

          [data.field]:
          data.message

        });


      }



      else{


        setErrors({


          general:
          data?.message ||
          "Đăng ký thất bại"


        });


      }



    }
    finally{


      setLoading(false);


    }


  };









  return (


    <div className="auth-wrapper">


      <div className="auth-card">





        <div className="auth-left">


          <h2>
            Create Account 🚀
          </h2>


          <p>
            Đăng ký hệ thống CRM
          </p>


        </div>






        <div className="auth-right">



          <h3>
            Đăng ký
          </h3>






          {
            errors.general &&

            <p className="error">

              {errors.general}

            </p>

          }








          <form onSubmit={handleSubmit}>


            {/* NAME */}

            <input

              name="name"

              placeholder="Họ tên"

              value={form.name}

              onChange={handleChange}

            />



            {
              errors.name &&

              <p className="error">

                {errors.name}

              </p>

            }







            {/* EMAIL */}

            <input

              type="email"

              name="email"

              placeholder="Email"

              value={form.email}

              onChange={handleChange}

            />



            {
              errors.email &&

              <p className="error">

                {errors.email}

              </p>

            }









            {/* PHONE */}

            <input


              type="tel"

              name="phone"

              placeholder="Số điện thoại"

              value={form.phone}

              onChange={handleChange}


              onInput={(e)=>{


                e.target.value =
                e.target.value.replace(
                  /[^0-9]/g,
                  ""
                );


              }}


            />




            {
              errors.phone &&

              <p className="error">

                {errors.phone}

              </p>

            }









            {/* PASSWORD */}

            <input

              type="password"

              name="password"

              placeholder="Mật khẩu"

              value={form.password}

              onChange={handleChange}

            />



            {
              errors.password &&

              <p className="error">

                {errors.password}

              </p>

            }









            {/* CONFIRM */}

            <input


              type="password"

              name="confirmPassword"

              placeholder="Nhập lại mật khẩu"

              value={form.confirmPassword}

              onChange={handleChange}


            />




            {
              errors.confirmPassword &&

              <p className="error">

                {errors.confirmPassword}

              </p>

            }








            <button disabled={loading}>


              {
                loading
                ? "Đang xử lý..."
                : "Đăng ký"
              }


            </button>





          </form>








          <p className="switch">

            Đã có tài khoản?


            <a href="/login">

              Đăng nhập

            </a>


          </p>







        </div>



      </div>


    </div>


  );

}



export default Register;