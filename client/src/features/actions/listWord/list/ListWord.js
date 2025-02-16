import AssignmentIcon from "@mui/icons-material/Assignment";
import DeleteIcon from "@mui/icons-material/Delete";
import DescriptionIcon from "@mui/icons-material/Description";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Box,
  IconButton,
  Tooltip,
  Typography
} from "@mui/material";
import Badge from '@mui/material/Badge';
import React, { useEffect, useState } from "react";
import { BsFillChatRightDotsFill } from "react-icons/bs";
import { FaPen } from 'react-icons/fa';
import { MdSportsEsports } from 'react-icons/md';
import './listWord.css';

import { Link, NavLink } from "react-router-dom";
// import { FaCheckCircle } from 'react-icons/fa';

import LockIcon from '@mui/icons-material/Lock';
import useAuth from "../../../../hooks/useAuth";
import useSchoolAndClass from "../../../../hooks/useSchoolAndClass";
import CurrentSchoolAndClass from "../../../companies/CurrentSchoolAndClass/CurrentSchoolAndClass";
import LOADING from "../../../loadingAnimation/LoadingAnimation";
import {
  useDeleteListWordsMutation,
  useGetAllListWordsByClassMutation,
  useGetAllTestsDoneMutation,
  useGetTestByClassAndUserMutation,
} from "../view/ListWordApiSlice";
const ListWord = ({ todos }) => {
  const { roles, _id: user } = useAuth(); // Retrieve roles
  const [activeConversationsCount,setActiveConversationsCount]=useState()
  const [getAllTestsDone, doneResponse] = useGetAllTestsDoneMutation();
  const [getTestByClassAndUser, studentResponse] =
    useGetTestByClassAndUserMutation();
  const [getAllListWordsByClass, teacherResponse] =
    useGetAllListWordsByClassMutation();

  let wordsList, isError, error, isLoading;

  if (todos) {
    wordsList = doneResponse.data;
    isError = doneResponse.isError;
    error = doneResponse.isError;
    isLoading = doneResponse.isLoading;
  } else if (roles === "Student") {
    wordsList = studentResponse.data;
    isError = studentResponse.isError;
    error = studentResponse.isStudentError;
    isLoading = studentResponse.isStudentisLoading;
  } else if (roles === "Teacher") {
    wordsList = teacherResponse.data;
    isError = teacherResponse.isError;
    error = teacherResponse.error;
    isLoading = teacherResponse.isLoading;
  }

  const { chosenClass, chosenSchool } = useSchoolAndClass();
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    if (roles === "Student" && !todos) {
      getTestByClassAndUser({ user });
    } else if (todos) {
      getAllTestsDone({ user });
    }
  }, []);
  useEffect(() => {
    if (roles === "Teacher" && chosenClass) getAllListWordsByClass(classObj);
  }, [chosenClass]);
useEffect(()=>{
  if(wordsList)
    console.log(wordsList,"data");
},[wordsList])
  const [deleteListWords] = useDeleteListWordsMutation();

  if (!chosenClass && roles === "Teacher") return <CurrentSchoolAndClass />;
  let classObj;
  if (chosenClass) classObj = { chosenClass: chosenClass };

  if (error) {
    return (
      <Typography color="error" variant="h5">
        {error.data.message}
      </Typography>
    );
  }

  // if (isLoading) return <Typography variant="h5">Loading...</Typography>;
if(isLoading)return <LOADING/>
  const handleDeleteClick = (list) => {
    if (window.confirm("בטוח שברצונך למחוק את המבחן?")) {
      deleteListWords({ _id: list._id });
    }
  };
  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };
  if (roles === "Student") {
    if (isError) console.log(isError, "error");
    if (wordsList) {
      console.log(wordsList, "testStudent");
    }
  }


  // אם playId לא null, מחזירים את הקומפוננטה Play בלבד

  const filteredRows = (wordsList?.data || [])
    .filter((list) =>
      list.title.toLowerCase().includes(searchText.toLowerCase())
    )
    .map((list) => ({
      id: list._id,
      title: list.title,
      date: list.date ? list.date.slice(0, 10) : "",
      wordCount: list.test.length,
      mark: `${list.mark}%` || 0,
      active:list.active,
      complete:list.complete
    }));

  const columns = [
    {
      field: "title",
      headerName: "כותרת",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    //הוספת עמודה רק אם המשתמש הוא תלמיד
    ...((roles === 'Student'&&todos) ? [{
      field: "mark",
      headerName: "ציון",
      flex: 1,
      headerAlign: "center",
      align: "center",
    }] : []),
    {
      field: "plays",
      headerName: "משחקים",
      flex: 1,
      headerAlign: "center",
      align: "center",
      sortable: false,
      renderCell: (params) => (
        <>
 

          <Tooltip title="plays">
            <IconButton
              component={Link}
              to={`/dash/play/${params.row.id}`}
              aria-label="play-memory"
              color="info"
              sx={{ mr: 1 }}
            >
              <MdSportsEsports />
            </IconButton>
          </Tooltip>
        </>)
    },
    {
      field: "actions",
      headerName: "פעולות",
      flex: 1,
      headerAlign: "center",
      align: "center",
      sortable: false,
      renderCell: (params) => (
        <>
          <Tooltip title="words">
            <IconButton
              component={Link}
              to={`/dash/words/${params.row.id}`}
              aria-label="update"
              color="info"
              sx={{ mr: 1  ,verticalAlign: 'middle' }} // שמירה על יישור אמצע}}
            >
              <VisibilityIcon />
            </IconButton>
          </Tooltip>

          {roles === "Teacher" ? (
            <>

       {  params.row.active&&         
            <Tooltip title="Update">
                <IconButton
                  component={Link}
                  to={`/dash/${params.row.id}`}
                  aria-label="update"
                  color="info"
                  sx={{ mr: 1 }}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
        }
        
          
           {!params.row.active&&
            <Tooltip title="Update-locked">
           <IconButton>
              <EditIcon />
             <LockIcon sx={{ color: '#ff5252', position: 'absolute', top: 16, right:15, fontSize: '1rem' }} />
            </IconButton>
            </Tooltip>

    }
              <Tooltip title="marks">
                <IconButton
                  component={Link}
                  to={`marks/${params.row.id}`}
                  aria-label="marks"
                  color="info"
                  sx={{ mr: 1 }}
                >
                  <AssignmentIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Delete">
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDeleteClick(params.row)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </>
          ) : roles === "Student" ? (
            <>



       {/* בדיקה אם השורה פעילה */}
       {(params.row.active||params.row.complete) ? (
          <Tooltip title="Go to test">
            <IconButton
              component={Link}
              to={`/dash/test/false/${params.row.id}`}
              aria-label="view"
              color="primary"
            >
              <DescriptionIcon />
            </IconButton>
          </Tooltip>
        ) : (
          // אייקון נעילה אם השורה לא פעילה
          <Tooltip title="Test locked">
          <Box
            sx={{
              position: 'relative',
              display: 'inline-flex',
              alignItems: 'center', // יישור באותו קו
              verticalAlign: 'middle'
            }}
          >
            <DescriptionIcon />
            <LockIcon
              sx={{
                color: '#ff5252',
                position: 'absolute',
                bottom: '-2px', // מיקום נמוך יותר כדי להתחיל מלמטה
                right: 0,
                fontSize: '0.9rem'
              }}
            />
          </Box>
        </Tooltip>
        )}


<Tooltip title="התכתבות עם המורה">
  <IconButton
    component={Link}
    to={`/dash/comments/${params.row.title}/${params.row.id}`}
    aria-label="התכתבות עם המורה"
    color="primary"
  >
    <Badge
      badgeContent={activeConversationsCount}  // משתנה שמחזיק את מספר השיחות האקטיביות
      color="secondary"  // צבע הרקע של האינדיקטור
    >
      <BsFillChatRightDotsFill />
    </Badge>
  </IconButton>
</Tooltip>
              <Tooltip title="trying">
                <IconButton
                  component={Link}
                  to={`/dash/test/true/${params.row.id}`}
                  aria-label="trying"
                  color="primary"
                >
                  <FaPen />
                </IconButton>
              </Tooltip>
            </>
          ) : null}
        </>
      ),
    },
  ];

  return (
<>
<div className="listWordContainer">
  <svg width="375" height="140" viewBox="0 0 375 140" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.4" d="M59.3457 113H33.5996V2.09375H59.3457V113ZM92.709 22.9648H0.845703V2.09375H92.709V22.9648ZM180.383 113H121.807V92.2051H180.383V113ZM130.49 113H104.592V2.09375H130.49V113ZM172.766 66.0781H121.807V45.9688H172.766V66.0781ZM180.383 22.9648H121.807V2.09375H180.383V22.9648ZM234.084 114.523C228.396 114.523 222.836 113.787 217.402 112.314C211.969 110.842 207.043 108.582 202.625 105.535C198.258 102.488 194.754 98.6289 192.113 93.957C189.523 89.2344 188.229 83.5977 188.229 77.0469H214.051C214.051 80.2461 214.482 82.9375 215.346 85.1211C216.26 87.3047 217.58 89.082 219.307 90.4531C221.033 91.7734 223.141 92.7383 225.629 93.3477C228.117 93.957 230.936 94.2617 234.084 94.2617C237.639 94.2617 240.508 93.7793 242.691 92.8145C244.875 91.7988 246.475 90.4785 247.49 88.8535C248.506 87.2285 249.014 85.4512 249.014 83.5215C249.014 81.2363 248.531 79.2559 247.566 77.5801C246.602 75.8535 244.697 74.2031 241.854 72.6289C239.01 71.0039 234.744 69.2773 229.057 67.4492C224.131 65.8242 219.408 63.9961 214.889 61.9648C210.42 59.8828 206.434 57.4453 202.93 54.6523C199.426 51.8594 196.633 48.6094 194.551 44.9023C192.52 41.1445 191.504 36.7773 191.504 31.8008C191.504 25.4531 193.307 19.9434 196.912 15.2715C200.568 10.5996 205.57 6.99414 211.918 4.45508C218.266 1.86523 225.502 0.570312 233.627 0.570312C241.854 0.570312 249.039 1.99219 255.184 4.83594C261.379 7.67969 266.203 11.6914 269.656 16.8711C273.16 22.0508 274.912 28.0937 274.912 35H249.166C249.166 32.2578 248.582 29.8457 247.414 27.7637C246.297 25.6309 244.545 23.9805 242.158 22.8125C239.822 21.5938 236.801 20.9844 233.094 20.9844C229.59 20.9844 226.645 21.4922 224.258 22.5078C221.922 23.5234 220.17 24.8691 219.002 26.5449C217.885 28.1699 217.326 30.0234 217.326 32.1055C217.326 34.2891 218.139 36.2188 219.764 37.8945C221.439 39.5703 223.801 41.1191 226.848 42.541C229.945 43.9121 233.627 45.2832 237.893 46.6543C245.916 49.1426 252.67 52.0625 258.154 55.4141C263.639 58.7148 267.777 62.6504 270.57 67.2207C273.414 71.7402 274.836 77.123 274.836 83.3691C274.836 89.9707 273.16 95.6074 269.809 100.279C266.457 104.9 261.734 108.43 255.641 110.867C249.547 113.305 242.361 114.523 234.084 114.523ZM341.639 113H315.893V2.09375H341.639V113ZM375.002 22.9648H283.139V2.09375H375.002V22.9648Z" fill="url(#paint0_radial_785_791)"/>
<path d="M82.25 75.8311H79.6621V69.6787H90.0625V109.156H82.25V75.8311ZM97.9971 69.6787H110.912C114.737 69.6787 117.634 70.6146 119.604 72.4863C121.573 74.3581 122.566 77.125 122.582 80.7871V99H114.672L114.623 80.1035C114.623 77.2552 113.386 75.8311 110.912 75.8311H105.907V99H97.9727L97.9971 69.6787ZM152.392 93.0674V99H127.074V92.8232H141.039V80.0059C141.039 77.2227 139.558 75.8311 136.596 75.8311H128.661V69.6787H137.182C139.656 69.6787 141.771 70.1019 143.529 70.9482C145.303 71.7783 146.654 72.999 147.582 74.6104C148.526 76.2054 148.998 78.126 148.998 80.3721V92.5791L152.392 93.0674ZM158.715 82.6914C158.861 81.3893 159.179 80.1442 159.667 78.9561C160.172 77.7516 160.757 76.8076 161.425 76.124C161.588 75.9613 161.701 75.8636 161.767 75.8311L161.742 75.709C161.107 75.8229 160.351 76.002 159.472 76.2461C158.609 76.4902 157.877 76.7344 157.274 76.9785L155.614 71.2412C157.486 70.5413 159.691 69.9798 162.23 69.5566C164.77 69.1335 167.187 68.9219 169.481 68.9219C173.99 68.9219 177.408 70.0693 179.735 72.3643C182.079 74.6429 183.259 78.012 183.275 82.4717V99H170.36V92.8477H175.316L175.292 81.3975C175.292 79.4932 174.918 78.0202 174.169 76.9785C173.42 75.9206 172.362 75.3916 170.995 75.3916C168.342 75.3916 166.812 77.4749 166.405 81.6416L164.696 99H156.859L158.715 82.6914ZM203.222 75.8311H200.731V69.6787H211.181V99H203.222V75.8311ZM228.832 79.7129C228.832 78.4596 228.474 77.4993 227.758 76.832C227.042 76.1647 226.008 75.8311 224.657 75.8311H215.917V69.6787H225.243C227.636 69.6787 229.695 70.0938 231.42 70.9238C233.161 71.7539 234.488 72.9502 235.399 74.5127C236.311 76.0752 236.767 77.9469 236.767 80.1279V99H228.832V79.7129ZM243.993 69.6787H256.908C260.733 69.6787 263.63 70.6146 265.6 72.4863C267.569 74.3581 268.562 77.125 268.578 80.7871V99H260.668L260.619 80.1035C260.619 77.2552 259.382 75.8311 256.908 75.8311H251.903V99H243.969L243.993 69.6787ZM298.388 93.0674V99H273.07V92.8232H287.035V80.0059C287.035 77.2227 285.554 75.8311 282.592 75.8311H274.657V69.6787H283.178C285.652 69.6787 287.768 70.1019 289.525 70.9482C291.299 71.7783 292.65 72.999 293.578 74.6104C294.522 76.2054 294.994 78.126 294.994 80.3721V92.5791L298.388 93.0674Z" fill="#A82D7A"/>
<path d="M51.918 130.195C51.9258 129.445 51.9922 128.832 52.1172 128.355C52.25 127.871 52.4609 127.43 52.75 127.031C53.0469 126.633 53.4414 126.18 53.9336 125.672C54.293 125.305 54.625 124.961 54.9297 124.641C55.2344 124.312 55.4805 123.961 55.668 123.586C55.8555 123.211 55.9492 122.754 55.9492 122.215C55.9492 121.402 55.7344 120.762 55.3047 120.293C54.875 119.816 54.2539 119.578 53.4414 119.578C52.7617 119.578 52.1523 119.77 51.6133 120.152C51.0742 120.527 50.8047 121.121 50.8047 121.934H48.6133C48.6289 121.051 48.8477 120.293 49.2695 119.66C49.6992 119.027 50.2773 118.543 51.0039 118.207C51.7305 117.871 52.543 117.703 53.4414 117.703C54.9336 117.703 56.0859 118.102 56.8984 118.898C57.7188 119.695 58.1289 120.781 58.1289 122.156C58.1289 122.859 57.9883 123.508 57.707 124.102C57.4258 124.688 57.0625 125.238 56.6172 125.754C56.1719 126.27 55.6992 126.762 55.1992 127.23C54.7695 127.621 54.4805 128.07 54.332 128.578C54.1836 129.078 54.1094 129.617 54.1094 130.195H51.918ZM53.1133 135.129C52.6914 135.129 52.3711 135.012 52.1523 134.777C51.9336 134.543 51.8242 134.254 51.8242 133.91C51.8242 133.566 51.9336 133.273 52.1523 133.031C52.3711 132.789 52.6914 132.668 53.1133 132.668C53.5352 132.668 53.8555 132.789 54.0742 133.031C54.293 133.273 54.4023 133.566 54.4023 133.91C54.4023 134.254 54.293 134.543 54.0742 134.777C53.8555 135.012 53.5352 135.129 53.1133 135.129ZM66.8594 121.195C68.6875 121.195 70.0508 121.633 70.9492 122.508C71.8555 123.375 72.3086 124.699 72.3086 126.48V135H70.1406L70.1289 126.352C70.1289 125.156 69.8711 124.289 69.3555 123.75C68.8477 123.211 68.0234 122.941 66.8828 122.941H64.9258C64.668 123.363 64.4609 123.906 64.3047 124.57C64.1562 125.227 64.082 125.902 64.082 126.598V131.25C64.082 132.523 63.7773 133.488 63.168 134.145C62.5664 134.793 61.6953 135.117 60.5547 135.117C60.3203 135.117 60.0938 135.105 59.875 135.082C59.6641 135.066 59.4414 135.043 59.207 135.012V133.266C59.3477 133.281 59.4844 133.293 59.6172 133.301C59.7578 133.309 59.8906 133.312 60.0156 133.312C60.7031 133.312 61.1992 133.137 61.5039 132.785C61.8086 132.434 61.9609 131.879 61.9609 131.121V126.762C61.9609 126.066 62.0508 125.363 62.2305 124.652C62.418 123.941 62.6797 123.371 63.0156 122.941H60.4258V121.195H66.8594ZM76.8789 135V122.941H75.2734V121.195H79.0586V135H76.8789ZM88.0117 135.234C87.3477 135.234 86.6172 135.168 85.8203 135.035C85.0312 134.902 84.2617 134.707 83.5117 134.449L83.9336 132.82C84.6523 133.039 85.3633 133.199 86.0664 133.301C86.7773 133.402 87.3984 133.453 87.9297 133.453C89.2109 133.438 90.1992 133.113 90.8945 132.48C91.5898 131.848 91.9375 130.941 91.9375 129.762V122.941H86.4062C86.1562 123.371 85.9531 123.918 85.7969 124.582C85.6484 125.246 85.5742 125.902 85.5742 126.551V127.605C85.7539 127.684 85.9883 127.738 86.2773 127.77C86.5664 127.801 86.9414 127.816 87.4023 127.816V129.691C86.7539 129.691 86.2031 129.668 85.75 129.621C85.2969 129.574 84.8906 129.492 84.5312 129.375C84.1797 129.258 83.8203 129.102 83.4531 128.906L83.4062 127.125C83.4062 126.336 83.5039 125.566 83.6992 124.816C83.9023 124.059 84.1758 123.434 84.5195 122.941H82.8438V121.195H94.1055V129.352C94.1055 130.688 93.8438 131.793 93.3203 132.668C92.7969 133.535 92.0781 134.184 91.1641 134.613C90.25 135.035 89.1992 135.242 88.0117 135.234ZM97.75 135V133.242H105.168L96.918 121.195H99.3672L103.562 127.535L107.969 133.898V135H97.75ZM103.961 129.27L102.613 127.523L106.105 121.195H108.555L103.961 129.27ZM110.324 122.941V117H112.492V121.195H119.992V122.941H110.324ZM120.812 122.566L115.75 135H113.418L119.148 121.195H120.812V122.566ZM137.781 135V126.34C137.781 125.145 137.512 124.281 136.973 123.75C136.434 123.211 135.566 122.941 134.371 122.941H129.367V121.195H134.477C136.281 121.195 137.645 121.633 138.566 122.508C139.496 123.375 139.961 124.672 139.961 126.398V135H137.781ZM129.391 135V130.289C129.391 129.484 129.457 128.871 129.59 128.449C129.723 128.027 129.859 127.668 130 127.371H131.781C131.688 127.723 131.617 128.117 131.57 128.555C131.523 128.984 131.5 129.516 131.5 130.148V135H129.391ZM143.266 135V133.242H150.684L142.434 121.195H144.883L149.078 127.535L153.484 133.898V135H143.266ZM149.477 129.27L148.129 127.523L151.621 121.195H154.07L149.477 129.27ZM157.645 135V122.941H156.039V121.195H159.824V135H157.645ZM169.762 135V125.367C169.762 124.617 169.539 124.027 169.094 123.598C168.656 123.16 168.055 122.941 167.289 122.941H162.648V121.195H167.359C168.789 121.195 169.906 121.578 170.711 122.344C171.523 123.102 171.93 124.164 171.93 125.531V135H169.762ZM187.445 121.195C189.273 121.195 190.637 121.633 191.535 122.508C192.441 123.375 192.895 124.699 192.895 126.48V135H190.727L190.715 126.352C190.715 125.156 190.457 124.289 189.941 123.75C189.434 123.211 188.609 122.941 187.469 122.941H185.512C185.254 123.363 185.047 123.906 184.891 124.57C184.742 125.227 184.668 125.902 184.668 126.598V131.25C184.668 132.523 184.363 133.488 183.754 134.145C183.152 134.793 182.281 135.117 181.141 135.117C180.906 135.117 180.68 135.105 180.461 135.082C180.25 135.066 180.027 135.043 179.793 135.012V133.266C179.934 133.281 180.07 133.293 180.203 133.301C180.344 133.309 180.477 133.312 180.602 133.312C181.289 133.312 181.785 133.137 182.09 132.785C182.395 132.434 182.547 131.879 182.547 131.121V126.762C182.547 126.066 182.637 125.363 182.816 124.652C183.004 123.941 183.266 123.371 183.602 122.941H181.012V121.195H187.445ZM206.477 135L196.469 121.195H198.906L208.902 135H206.477ZM196.961 135V129.996C196.961 128.707 197.199 127.668 197.676 126.879C198.152 126.09 198.895 125.512 199.902 125.145L200.758 126.27C199.633 126.777 199.07 127.758 199.07 129.211V135H196.961ZM208.961 121.195L204.203 129.527L202.762 127.852L206.512 121.195H208.961ZM218.676 139.875V122.941H217.047V121.195H220.82V139.875H218.676ZM225.074 135L225.086 121.195H230.277C232.105 121.195 233.469 121.633 234.367 122.508C235.266 123.375 235.719 124.699 235.727 126.48V135H233.559V126.352C233.559 125.156 233.301 124.289 232.785 123.75C232.27 123.211 231.441 122.941 230.301 122.941H227.254L227.242 135H225.074ZM238.246 135V133.242H245.746L247.914 133.16L249.59 133.336V135H238.246ZM245.746 134.508V126.34C245.746 125.145 245.477 124.281 244.938 123.75C244.406 123.211 243.539 122.941 242.336 122.941H238.996V121.195H242.453C244.25 121.195 245.609 121.633 246.531 122.508C247.453 123.375 247.914 124.672 247.914 126.398V134.508H245.746ZM252.191 135L253.246 126.223C253.332 125.574 253.516 124.969 253.797 124.406C254.078 123.844 254.41 123.41 254.793 123.105C254.832 123.074 254.871 123.047 254.91 123.023C254.957 122.992 254.996 122.965 255.027 122.941L255.004 122.906C254.66 122.961 254.223 123.059 253.691 123.199C253.168 123.332 252.684 123.477 252.238 123.633L251.734 121.992C252.336 121.781 252.988 121.598 253.691 121.441C254.402 121.285 255.121 121.164 255.848 121.078C256.574 120.984 257.254 120.938 257.887 120.938C259.746 120.938 261.164 121.434 262.141 122.426C263.125 123.41 263.621 124.859 263.629 126.773V135H257.945V133.254H261.461V126.527C261.461 125.293 261.18 124.359 260.617 123.727C260.062 123.086 259.262 122.766 258.215 122.766C257.457 122.766 256.824 123.059 256.316 123.645C255.809 124.223 255.496 125.012 255.379 126.012L254.336 135H252.191ZM281.523 135V126.34C281.523 125.145 281.254 124.281 280.715 123.75C280.176 123.211 279.309 122.941 278.113 122.941H273.109V121.195H278.219C280.023 121.195 281.387 121.633 282.309 122.508C283.238 123.375 283.703 124.672 283.703 126.398V135H281.523ZM273.133 135V130.289C273.133 129.484 273.199 128.871 273.332 128.449C273.465 128.027 273.602 127.668 273.742 127.371H275.523C275.43 127.723 275.359 128.117 275.312 128.555C275.266 128.984 275.242 129.516 275.242 130.148V135H273.133ZM289.223 135L287.348 123.035L286.375 122.871V121.195H293.078L293.066 122.941H289.504L291.461 135H289.223ZM297.145 128.895V122.941H294.613V121.195H299.324V128.895H297.145ZM313 135L302.992 121.195H305.43L315.426 135H313ZM303.484 135V129.996C303.484 128.707 303.723 127.668 304.199 126.879C304.676 126.09 305.418 125.512 306.426 125.145L307.281 126.27C306.156 126.777 305.594 127.758 305.594 129.211V135H303.484ZM315.484 121.195L310.727 129.527L309.285 127.852L313.035 121.195H315.484ZM317.324 135V133.242H324.824L326.992 133.16L328.668 133.336V135H317.324ZM324.824 134.508V126.34C324.824 125.145 324.555 124.281 324.016 123.75C323.484 123.211 322.617 122.941 321.414 122.941H318.074V121.195H321.531C323.328 121.195 324.688 121.633 325.609 122.508C326.531 123.375 326.992 124.672 326.992 126.398V134.508H324.824Z" fill="#2D40A8"/>
<defs>
<radialGradient id="paint0_radial_785_791" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(-492 -20.015) rotate(5.00127) scale(1365.2 237.581)">
<stop stop-color="#F3A9D5"/>
<stop offset="1" stop-color="#A82D7A"/>
</radialGradient>
</defs>
</svg>
<div className="testFilter">
  <button className="chosenButton">כל הבחנים</button>
  <button className="notChosenButton">בחנים בדוקים</button>
</div>
<div>
<table>
  <thead className="tableHead">
    <tr>
      <th className="jj">תאריך</th>
      <th>על המבחן</th>
      <th>ציון</th>
      <th>תוספות</th>
    </tr>
  </thead>
  <tbody >
    {filteredRows.map((row) => (
      <tr className="tableRow" key={row.id}>
        <td>{row.date}</td>
        <td>{row.title}</td>
        <td>{row.grade}</td>
        <td>{<NavLink to={`/dash/play/${row.id}`}><MdSportsEsports className="iconLink"/></NavLink>}</td>
      </tr>
    ))}
  </tbody>
</table>
</div>
</div>
</>
  );
};

export default ListWord;