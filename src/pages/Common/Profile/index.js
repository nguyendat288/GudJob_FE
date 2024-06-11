import React, { useEffect, useState } from 'react'
import Avatar from '../../../assets/avatar-sample.jpg'
import About from '../../../assets/about.jpg'
import Linkedin from '../../../assets/linkedin.png'
import Github from '../../../assets/github.png'
import Tick from '../../../assets/tick.png'
import School from '../../../assets/school.png'
import { useSelector } from 'react-redux';
import profileApi from '../../../services/profileApi'

function Profile() {

const currentUser = useSelector((state) => state.auth.login?.currentUser)
const [profile, setProfile] = useState();
console.log("currentUser", currentUser);
useEffect(() => {
    const getData = async () => {
        let res = await profileApi.getUserProfile();
        setProfile(res)
    }
    getData()
}, [])

console.log("profile", profile);
  return (
    <div>
    <section id='profile'>
        <div className='section__pic-container'>
            <img src={Avatar} alt='Avatar' className='avatar'></img>
        </div>
        <div className='section__text'>
            <p className='section__text__p1'>Hello, I'm</p>
            <h1 className='title'>{profile?.name}</h1>
            <p className='section__text__p2'>Backend Developer</p>
            <p>I am a backend developer who is always dedicated to my work and ready when a new job comes up</p>
            <div id='socials-container'>
                <img
                    src={Linkedin}
                    alt='linkedin'
                    className='icon'
                />
                <img
                    src={Github}
                    alt='github'
                    className='icon'
                />
            </div>
        </div>
    </section>
    <section id='about'>
        <p className='section__text__p1'>Get To Know More</p>
        <h1 className='title'>About Me</h1>
        <div className='section-container'>
            <div className='section__pic-container'>
                <img src={About} alt='Avatar' className='about-pic'></img>
            </div>
            <div className='about-details-container'>
                <div className='about-containers'>
                    <div className='details-container'>
                        <img src={Tick} alt='Avatar' className='icon'></img>
                        <h3>Education</h3>
                        <p>{profile?.educations[0]?.universityCollege}</p>
                    </div>
                    <div className='details-container'>
                        <img src={School} alt='Avatar' className='icon'></img>
                        <h3>Experience</h3>
                        <p>{profile?.experiences[0]?.title}</p>
                        <p>{profile?.experiences[0]?.summary}</p>
                    </div>
                </div>
                <div className='text-container'>
                    {profile?.description}
                </div>
            </div>
        </div>
    </section>
    </div>
  )
}

export default Profile





