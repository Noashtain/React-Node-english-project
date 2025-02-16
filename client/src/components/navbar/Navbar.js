import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useGetAllListWordsByClassAndByActiveMutation, useGetTestByClassAndUserMutation } from '../../features/actions/listWord/view/ListWordApiSlice';
import { useSendLoguotMutation } from '../../features/auth/authApiSlice';
import useAuth from '../../hooks/useAuth';
import useSchoolAndClass from '../../hooks/useSchoolAndClass';
import './navbar.css';
// עיצוב מותאם אישית עבור שדה החיפוש
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#ffffff',
    color: '#000000',
    padding: '10px 20px',
    paddingLeft: '40px',
    transition: theme.transitions.create(['background-color', 'box-shadow', 'border'], {
      duration: theme.transitions.duration.shortest,
    }),
    '&::placeholder': {
      color: '#aaaaaa',
    },
  },
}));

const Navbar = () => {
  const [getAllListWordsByClassAndByActive, { data: dataTests }] =
    useGetAllListWordsByClassAndByActiveMutation();
  const { chosenClass } = useSchoolAndClass();
  const [currentPage, setCurrentPage] = useState(window.location.hash);
  useEffect(() => {
    setCurrentPage(window.location.hash.split('/').pop())
  }, [window.location.hash])

  const [logout, { IsSucsses, isLoading }] = useSendLoguotMutation();

  const [getTestByClassAndUser, { data }] =
    useGetTestByClassAndUserMutation();
  const { _id: user } = useAuth();
  const [countOfNotifications, setCountOfNotifications] = useState(0)
  useEffect(() => {
    if (roles === 'Student') {
      getTestByClassAndUser({ user });
      if (data) {
        setCountOfNotifications(data.data.length)
      }
    }
    else {
      getAllListWordsByClassAndByActive({ active: false, chosenClass })
      if (dataTests && chosenClass) {
        setCountOfNotifications(dataTests.data.length)
      }
    }
  }, [getTestByClassAndUser, user, data, dataTests, chosenClass]);

  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);

  const { fullname, roles } = useAuth();

  const handleNotificationClick = (event) => {
    setNotificationAnchorEl(event.currentTarget);
    setProfileAnchorEl(null);
  };

  const handleProfileClick = (event) => {
    setProfileAnchorEl(event.currentTarget);
    setNotificationAnchorEl(null);
  };

  const handleClose = () => {
    setNotificationAnchorEl(null);
    setProfileAnchorEl(null);
  };


  const navigate = useNavigate()
  const handleLogout = async () => {

    try {
      await logout();
      navigate('/') // הנח שהפונקציה logout מבוצעת בצורה אסינכרונית
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };
  return (
    <>
      <div className="navbar">
        <NavLink to="/dash" className="text">ENGLIQUIZZES</NavLink>
        <div className="wrappeLinks">
          <NavLink to="about" className="linksToPages">אודות</NavLink>
          <NavLink to="wordsList" className="linksToPages">בחנים</NavLink>
          <NavLink to="play" className="linksToPages">משחקים</NavLink>
          <NavLink to="graphs" className="linksToPages">ציונים</NavLink>
          <NavLink to="tips" className="linksToPages">טיפים</NavLink>
          <NavLink to="gramar-rules" className="linksToPages">כללי דקדוק</NavLink>
          <NavLink to="todos" className="linksToPages">תמיכה טכנית</NavLink>
        </div>
        <svg width="34" height="35" viewBox="0 0 34 35" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 16.9756C0 7.22119 7.42263 0 17 0C26.5774 0 34 7.22119 34 16.9756C34 26.73 26.5774 33.9512 17 33.9512C15.2788 33.9512 13.6298 33.7171 12.0785 33.2796C11.7777 33.1936 11.4573 33.2168 11.1711 33.3452L7.79662 34.8809C7.59282 34.9735 7.37005 35.0131 7.1479 34.9962C6.92575 34.9794 6.71101 34.9066 6.52257 34.7844C6.33413 34.6621 6.17774 34.494 6.06716 34.295C5.95658 34.0959 5.89518 33.8719 5.88837 33.6427L5.79488 30.5298C5.78829 30.3404 5.7444 30.1543 5.66587 29.9828C5.58734 29.8113 5.47579 29.6581 5.338 29.5323C2.0315 26.4872 0 22.077 0 16.9756ZM11.7852 13.7839L6.7915 21.9392C6.31337 22.7224 7.24625 23.604 7.96238 23.0461L13.328 18.8547C13.5045 18.7167 13.7198 18.6417 13.9414 18.6409C14.163 18.6401 14.3788 18.7136 14.5562 18.8503L18.5279 21.9173C18.8097 22.1349 19.1322 22.29 19.4751 22.3728C19.818 22.4557 20.1739 22.4645 20.5203 22.3987C20.8667 22.3329 21.196 22.194 21.4877 21.9907C21.7793 21.7873 22.0269 21.524 22.2148 21.2173L27.2085 13.062C27.6887 12.2789 26.7537 11.3973 26.0376 11.9551L20.672 16.1465C20.4955 16.2845 20.2802 16.3596 20.0586 16.3603C19.837 16.3611 19.6211 16.2876 19.4437 16.1509L15.4721 13.0817C15.1903 12.8642 14.8678 12.7091 14.5249 12.6262C14.182 12.5434 13.8261 12.5346 13.4797 12.6003C13.1333 12.6661 12.804 12.805 12.5123 13.0084C12.2207 13.2117 11.9731 13.4772 11.7852 13.7839Z" fill="url(#paint0_linear_1052_107)" />
          <defs>
            <linearGradient id="paint0_linear_1052_107" x1="5.39521" y1="-6.65419" x2="34.2657" y2="51.4639" gradientUnits="userSpaceOnUse">
              <stop stop-color="#A82D7A" />
              <stop offset="0.985679" stop-color="#082B93" />
            </linearGradient>
          </defs>
        </svg>
        <div className="numberOfNotificationsContainer">
          <svg width="32" height="36" viewBox="0 0 32 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 36C17.2124 36 18.3752 35.5259 19.2325 34.6821C20.0898 33.8382 20.5714 32.6937 20.5714 31.5002H11.4286C11.4286 32.6937 11.9102 33.8382 12.7675 34.6821C13.6248 35.5259 14.7876 36 16 36ZM16 4.31723L14.1783 4.67946C12.1115 5.0931 10.2536 6.19736 8.91932 7.80511C7.58505 9.41287 6.85651 11.4252 6.85714 13.5012C6.85714 14.9142 6.55086 18.4442 5.808 21.9203C5.44229 23.6459 4.94857 25.4436 4.29257 27.0005H27.7074C27.0514 25.4436 26.56 23.6482 26.192 21.9203C25.4491 18.4442 25.1429 14.9142 25.1429 13.5012C25.143 11.4256 24.4142 9.41378 23.08 7.80649C21.7457 6.1992 19.8881 5.09528 17.8217 4.68171L16 4.31723ZM30.2171 27.0005C30.7269 28.0062 31.3166 28.8026 32 29.2504H0C0.683429 28.8026 1.27314 28.0062 1.78286 27.0005C3.84 22.9507 4.57143 15.4811 4.57143 13.5012C4.57143 8.05653 8.50286 3.51178 13.7257 2.47458C13.6938 2.16175 13.7289 1.8458 13.8286 1.54712C13.9284 1.24845 14.0907 0.973667 14.305 0.740509C14.5193 0.50735 14.7808 0.320989 15.0728 0.193443C15.3647 0.0658977 15.6806 0 16 0C16.3194 0 16.6353 0.0658977 16.9272 0.193443C17.2192 0.320989 17.4808 0.50735 17.695 0.740509C17.9093 0.973667 18.0716 1.24845 18.1714 1.54712C18.2711 1.8458 18.3062 2.16175 18.2743 2.47458C20.8582 2.99105 23.1812 4.37104 24.8496 6.38067C26.518 8.3903 27.4291 10.9059 27.4286 13.5012C27.4286 15.4811 28.16 22.9507 30.2171 27.0005Z" fill="url(#paint0_linear_1052_103)" />
            <defs>
              <linearGradient id="paint0_linear_1052_103" x1="5.07785" y1="-6.84431" x2="36.3286" y2="50.7202" gradientUnits="userSpaceOnUse">
                <stop stop-color="#A82D7A" />
                <stop offset="0.985679" stop-color="#082B93" />
              </linearGradient>
            </defs>
          </svg>
          <div className='numberOfNotifications'>{countOfNotifications}</div>
        </div>
        <div className="wrapper">
          <svg className='details' width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.5 18.5C20.9533 18.5 23.306 17.5254 25.0407 15.7907C26.7754 14.056 27.75 11.7033 27.75 9.25C27.75 6.79675 26.7754 4.44397 25.0407 2.70926C23.306 0.974551 20.9533 0 18.5 0C16.0467 0 13.694 0.974551 11.9593 2.70926C10.2246 4.44397 9.25 6.79675 9.25 9.25C9.25 11.7033 10.2246 14.056 11.9593 15.7907C13.694 17.5254 16.0467 18.5 18.5 18.5ZM24.6667 9.25C24.6667 10.8855 24.017 12.454 22.8605 13.6105C21.704 14.767 20.1355 15.4167 18.5 15.4167C16.8645 15.4167 15.296 14.767 14.1395 13.6105C12.983 12.454 12.3333 10.8855 12.3333 9.25C12.3333 7.6145 12.983 6.04598 14.1395 4.88951C15.296 3.73303 16.8645 3.08333 18.5 3.08333C20.1355 3.08333 21.704 3.73303 22.8605 4.88951C24.017 6.04598 24.6667 7.6145 24.6667 9.25ZM37 33.9167C37 37 33.9167 37 33.9167 37H3.08333C3.08333 37 0 37 0 33.9167C0 30.8333 3.08333 21.5833 18.5 21.5833C33.9167 21.5833 37 30.8333 37 33.9167ZM33.9167 33.9043C33.9136 33.1458 33.4418 30.8642 31.3513 28.7737C29.341 26.7633 25.5577 24.6667 18.5 24.6667C11.4422 24.6667 7.659 26.7633 5.64867 28.7737C3.55817 30.8642 3.0895 33.1458 3.08333 33.9043H33.9167Z" fill="white" />
          </svg>
        </div>
      </div>
    </>
  );
};

export default Navbar;
