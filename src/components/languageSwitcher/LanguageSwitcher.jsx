import './style.css';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ButtonGroup, Button} from '@mui/material';

export default function LanguageSwitcher() {
    const { t, i18n } = useTranslation();

    function setEnglish(){
        i18n.changeLanguage("en");
    }

    function setTurkish(){
        i18n.changeLanguage("tr");
    }

    return (
        <ButtonGroup variant="text" className='buttons'>
            <Button sx={{ backgroundColor: "primary.dark"}}><img alt="Türkçe" width="30vw" height="18vw" src="http://purecatamphetamine.github.io/country-flag-icons/3x2/TR.svg" onClick={setTurkish}/></Button>
            <Button sx={{ backgroundColor: "primary.dark"}}><img alt="English" width="30vw" height="18vw" src="http://purecatamphetamine.github.io/country-flag-icons/3x2/GB.svg" onClick={setEnglish}/></Button>
        </ButtonGroup>
    )
}