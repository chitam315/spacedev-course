import React from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Field from '../../components/Field'
import { useForm } from '../../hooks/useForm'
import { useScrollTop } from '../../hooks/useScrollTop'
import { courseService } from '../../services/course.service'
import { currency } from '../../utils/currency'

export default function Register() {
    const [isSuccess, setIsSuccess] = useState(false)

    useScrollTop()

    const { id } = useParams()

    const [detail, setDetail] = useState(() => {
        return courseService.getCourseWithID(id)
    })

    const rules = {
        name: [
            { require: true, message: "Họ và tên không được để trống" },
        ],
        phone: [
            { require: true, message: "Số điện thoại không được để trống" },
            { regex: 'phone', message: "Sai định dạng sđt" }
        ],
        email: [
            { require: true, message: "Mail không được để trống" },
            { regex: 'email', message: "Sai định dạng mail" }
        ],
        facebook: [
            { require: true, message: "Facebook không được để trống" },
            { regex: 'facebook', message: "Sai định dạng facebook" }
        ],
        opinion: [],
    }

    const { register, validate, values, setValuesForm } = useForm(rules)

    const onSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log(values);
            setIsSuccess(true)
        } else {
            console.log('validate fail');
        }
    }
    console.log('re-render');

    return (
        <div>
            <main className="register-course" id="main">
                {isSuccess ? (
                    <div className="register-success">
                        <div className="contain">
                            <div className="main-title">đăng ký thành công</div>
                            <p>
                                <strong>Chào mừng  đã trở thành thành viên mới của Spacedev Team.</strong> <br />
                                Cảm ơn bạn đã đăng ký khóa học tại <strong>Spacedev</strong>, chúng tôi sẽ chủ động liên lạc với bạn thông qua facebook
                                hoặc số điện thoại của bạn.
                            </p>
                        </div>
                        <a href="/" className="btn main rect">về trang chủ</a>
                    </div>
                ) : (
                    <section>
                        <div className="container">
                            <div className="wrap container">
                                <div className="main-sub-title">ĐĂNG KÝ</div>
                                <h1 className="main-title">{detail.title}</h1>
                                <div className="main-info">
                                    <div className="date"><strong>Khai giảng:</strong> 15/11/2020</div>
                                    <div className="time"><strong>Thời lượng:</strong> 18 buổi</div>
                                    <div className="time"><strong>Học phí:</strong> {currency(detail.money)} VND</div>
                                </div>
                                <div className="form">
                                    <Field
                                        label="Họ và tên"
                                        require
                                        placeholder="Họ và tên bạn"
                                        {...register("name")}
                                    />
                                    <Field
                                        label="Số điện thoại"
                                        require
                                        placeholder="Số điện thoại bạn"
                                        {...register("phone")}
                                    />
                                    <Field
                                        label="Email"
                                        require
                                        placeholder="Email của bạn"
                                        {...register("email")}
                                    />
                                    <Field
                                        label="URL Facebook"
                                        require
                                        placeholder="https://facebook.com"
                                        {...register("facebook")}
                                    />
                                    <Field
                                    label="Sử dụng COIN"
                                    renderInput= { (_,props) => (
                                        <div className="checkcontainer">
                                            Hiện có <strong>300 COIN</strong>
                                            {/* Giảm giá còn <span><strong>5.800.000 VND</strong>, còn lại 100 COIN</span> */}
                                            {/* Cần ít nhất 200 COIN để giảm giá */}
                                            <input type="checkbox" /*defaultChecked="checked"*/  />
                                            <span className="checkmark" />
                                        </div>
                                    )}
                                    />
                                    
                                    <label>
                                        <p>Hình thức thanh toán</p>
                                        <div className="select">
                                            <div className="head">Chuyển khoản</div>
                                            <div className="sub">
                                                <a href="#">Chuyển khoản</a>
                                                <a href="#">Thanh toán tiền mặt</a>
                                            </div>
                                        </div>
                                    </label>
                                    <Field
                                        label="Ý kiến cá nhân"
                                        placeholder="Mong muốn cá nhân và lịch bạn có thể học."
                                        {...register("opinion")}
                                    />
                                    <button className="btn main rect" onClick={onSubmit}>đăng ký</button>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

            </main>
            {/* popup video homepage */}

        </div>
    )
}


