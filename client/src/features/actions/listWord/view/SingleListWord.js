import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth';
import LOADING from '../../../loadingAnimation/LoadingAnimation';
import AddWordsList from '../add/AddWordsList';
import {
  useGetListWordsByIdMutation,
  useUpdateListWordsMutation
} from './ListWordApiSlice';

const SingleListWord = () => {
  const { _id2 } = useAuth();
  const { _id } = useParams();
  const [updateListWords, { isError, error, isSuccess: isUpdateSuccess, data: updatedData }] = useUpdateListWordsMutation();
  const [getListWordsById, { isSuccess, data: listWord, isLoading, isError: err }] = useGetListWordsByIdMutation();
  const navigate = useNavigate();

  const [wordList, setWordList] = useState([]);
  const [active, setActive] = useState(true);
  const [seeWords, setSeeWords] = useState(false);
  const [countListenToWord, setCountListenToWord] = useState(5);

  useEffect(() => {
    getListWordsById({ _id });
  }, [_id]);

  useEffect(() => {
    if (isSuccess && listWord) {
      setActive(listWord.data.active);
      setSeeWords(listWord.data.seeWords);
      setCountListenToWord(listWord.data.countListenToWord);
      setWordList(listWord.data.test.map(({ word, translate }) => ({ word, translate })));
    }
  }, [isSuccess, listWord]);

  useEffect(() => {
    if (isUpdateSuccess) {
      navigate('/dash/actions');
    }
  }, [isUpdateSuccess]);

  if (isLoading) return <LOADING/>
  if (isError || err) return <Typography variant="h6" align="center">Error: {error?.data?.message || 'Something went wrong!'}</Typography>;
return <AddWordsList WORDLIST={listWord}/>
};

export default SingleListWord