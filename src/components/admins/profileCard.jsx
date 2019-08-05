import React from 'react'
import './index.scss'
import MainButtonOutlined from '../common/mainButtonOutlined'

const ProfileCard = (props) =>
    <div className="profile-container">
        <div className="header-container">
            <div className="header-text-container">
                <div>
                    <span className="user-fullname">Uxuw Guereca</span>
                    <MainButtonOutlined text='Editar' />
                </div>
                <div>
                    <span className="username">uxue_gue</span>
                </div>
            </div>
            <div className="header-photo-container">
                <img className="profile-photo" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHkAAAB5CAMAAAAqJH57AAAAZlBMVEX///8AAAD4+Pjs7Ozh4eHz8/Pd3d1vb2/Dw8OQkJDw8PCYmJhfX1/7+/sWFhY5OTnX19d5eXlkZGQsLCwxMTEkJCTLy8tBQUFISEi1tbULCwusrKyfn58dHR29vb2lpaWHh4dUVFRZAJe5AAAEmklEQVRoge1a19qqOhSkS/tVQIpigfd/yU0EpKXM0vidi+PcEjIkWZnVMIwffvjhh/8VbO/+iJpd3LZV26ZJE9W+Y3+b1PXOSXwzt8jSxnesb9GGdXLgkL5wKZO7q5/WrVsZ6wu7u15eP4VoeyRHXbTh9ULgZTjddRy5HfAsSsldf3ribpS/wctQnj8iPkuNWYH2/fO24w94GZo3j/vxIW+HvHiD1/10wT0aMnGx10JsmpVDI4408XbIfQpxoo+4wwPm1XTEEyKQ2G41E6N2ZpfaiTsXBhCH2ReIEWr3E72UIVEQ/1VfIjbNQM68+xqxadYy4is8zb5MgigKgh3hdCS+ywenyBPf+RvesY73FFTamzA2drCo51KH6xcDjDoWMbfQ61wttBroXYGYQV4iXa93hAcJEPeojx989HPZyL2oOFHKXwu8KI/qkNPmfDoS+6jCSYD6sgkUQsCupVLwBODXN/YN2KZKeRkAXVkFhbb6jQNAbITqefLlG4BdegizcVZPtMg2HfV4NKJRR1LVfLj6lE8iBVkDkIXZSdtqycfjR/XBpdNgtXPM0CV3OYJ60a87bakDEUVAsUCLzwZ8JSUhVavhYUzr1cpT/Um5lgAuypDwhCflyIZAjPieQQ6BGIiUlOF3FJB5WnER0LHnlbbUKn+gVR2Ag27YOEB0hJEbH4D7eZossDdIPjYDsIvPABhIlhsas9Gqp2Q2C+SOVGZgMRF0KCTtBJlbLNilrrlVT5lBBka1MIS5kwgkfSTeKkstx8xTIglRS2NGTKdTsRYYdcHjAgZAw1jwjuyMSasg1siUVwPKuvEojAGqIF4NZBTNuLHyUoAxEwJAMB3uggNomEnpQmHlgxhkTtWEtM3uMg2wF4UHn5BlM40AmZEU9gkLLNjGBtoHQxeN+AGGFMm1h2+EYKOdtcaAS6yYmsCF04hQY0UkFN1rpmF4lyZXE0O+oseZUN5VO0sCcecl0fouQypP7BxKI8IxPMJoM5Z1lT1KI2JvQSW4CZW4QnQndchZjYvWMrk9+Mu2MT/xAvO71E7ggeO33Cu1gcpKqPgVHFHWy9zynV8RmBh7yEGX1+UHtoHvsG0PvSJYqGCGbeGJfbs68ysjlvlBoUbVfU4BkPfhlXzgbVcMewt0Spt+ZBipItq+Ui7TkjyaFyoUdlRNZUW3lrrpfe8DJLWhYFUgcST7kz8WdmedJdyjyxVNF3O801Ew+BZtqjiW2BmN3QH+dl8E8aYTbfe85P+s4wiWvR+/khs6yST6+Ni9bvAtbXxx0YrfU5kSB862XMW8A2yvKBzlf0kFLzqaLHHTkLy88++L4AO3Gzqvoq7MZo/1LDCEm0hv3n1aOumbTuKtSGaL+GL+t91e2990A9zlWS8bbvMI6rNfynhYOqXVw6mE1Wgn7uIV4ZJnVZWSUr6HMZlwuXk23nl992kO56V72/nd3m8QEmUSRrHi5aS9euu26xF2L7cZV2hZ9FjxHmhBf9J8L+SW1PITBYVor4eHxJ/2CHC71CcTOph6fct1IpauS+0b30dA7HrpQwQXeXTD+4o4/vDDDz/8N/gHpig9Zdt5loQAAAAASUVORK5CYII=" alt="profile-pic" />
            </div>
        </div>
        <div className="data-container">
            <div className="data-column labels">
                <p>Email</p>
                <p>Número de teléfono</p>
                <p>Género</p>
                <p>Fecha de nacimiento</p>
                <p>Código Postal</p>
            </div>
            <div className="data-column info data-column-info-1">
                <p>uxu_g@gmail.com</p>
                <p>7723748240</p>
                <p>Hombre</p>
                <p>27 Septiembre 7980</p>
                <p>42560</p>
            </div>
            <div className="data-column labels data-column-2">
                <p>Calle</p>
                <p>Ciudad</p>
                <p>Estado</p>
                <p>País</p>
            </div>
            <div className="data-column info">
                <p>Benito Juarez</p>
                <p>Actopan</p>
                <p>Hidalgo</p>
                <p>México</p>
            </div>
        </div>
    </div>

export default ProfileCard