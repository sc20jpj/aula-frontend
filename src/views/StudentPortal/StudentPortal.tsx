import { useSelector } from 'react-redux';
import { useAppDispatch } from '@store/hooks';
import {
    auth, getCurrentSession, getUserAttributes, sendSignOut,
} from '@store/auth/authSlice'
import { Link, Route, useNavigate } from 'react-router-dom';
import RoutesChoice from '@enums/Routes';
import Button from '@components/Button/Button'
import { useEffect } from 'react';
import { API } from '@lib/APi';
import { user } from '@store/user/UserSlice';
import PointsBox from '@components/PointsBox/PointsBox';
import PointsBoxList from '@components/PointsBoxList/PointsBoxList';
import BadgeImage from '@components/BadgeImage/BadgeImage';
import AccordionContainer from '@components/AccordionContainer/AccodionContainer';

function StudentPortal() {

    const dispatch = useAppDispatch()
    const state = useSelector(auth);
    const navigate = useNavigate()
    const current_user = useSelector(user);

    useEffect(() => {
        console.log("teacher : ", state.teacher)
        if (state.teacher) {
            navigate(RoutesChoice.TeacherPortal)
        }
    }, [])


    return (
        <>



            <h1>Welcome to the Aula project</h1>
            <h2>Introduction</h2>

            <p>This site is a test on gamification as part of a University of leeds dissertation on how
                gamification affects learning within higher education online learning management systems. It is meant to demonstrate if gamification can be used in a higher education setting
                for better engagment with learning resources as well as better retention of knowledge.
            </p>


            <p> Please promptly complete any quizzes that you have been assigned to and try not to use any external material other than what's in your training.</p>

            <p>Please ensure you have filled in the consent forms and these will detail how your personal data will be used</p>

            <p>As for passwords all passwords are securely stored on AWS cognito and haven't been kept by the student</p>
            <Link to={RoutesChoice.SignUp}>SignUp</Link>

            <h2>How it works </h2>

            <AccordionContainer title='XP'>

                <p>XP can be collected via a few activities and works and will decided via a teacher but is mainly collected towards your performance in the quizzes for classes. XP will be handed out in the following ways:
                </p>
                <PointsBoxList number={1} text='directly via your score on an quiz' />
                <PointsBoxList number={2} text='Collecting any badges' />
                <PointsBoxList number={3} text='completing an activity first (including filling out the consent forms first)' />
                <PointsBoxList number={4} text='maintaining good communication with me during the experiment and providing feedback' />

            </AccordionContainer>

            <AccordionContainer title='Badges'>
                <p>Badges can be collected in acccodance with your performance in the quiz and with communicating with me in the study</p>
                <p>The avaliable badges are:</p>

                <PointsBoxList number={1} text='best performer in a quiz' />
                <PointsBoxList number={2} text='most improved' />
                <PointsBoxList number={3} text='best performer in a class' />
                <PointsBoxList number={4} text='best performer in the study' />
                <PointsBoxList number={5} text='most improved in the study' />
                <PointsBoxList number={6} text='completion badges for completing a quiz ' />
                <PointsBoxList number={7} text='best communicator*' />


                <p>*This badge will awarded to the person who provides best feedback and communication about the study and website to me</p>
            </AccordionContainer>

            <AccordionContainer title='Leaderboard'>
                <p>As you can see their is a leaderboard which tracks points people have collected in the study. This tracks points across all quizzes in every class plus any additional points accumalated
                    <p>However once you have been added to a class there will a different leaderboard specific to that class. This leaderboard will just track test scores for that class</p>
                </p>
            </AccordionContainer>







        </>
    )
}

export default StudentPortal
