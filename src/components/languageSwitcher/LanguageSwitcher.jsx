import './style.css';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ButtonGroup, Button} from '@mui/material';

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();

    return (
        <ButtonGroup variant="text" aria-label="text button group" className='buttons'>
            <Button><img alt="Türkçe" src="http://purecatamphetamine.github.io/country-flag-icons/3x2/TR.svg"/></Button>
            <Button><img alt="English" src="http://purecatamphetamine.github.io/country-flag-icons/3x2/GB.svg"/></Button>
        </ButtonGroup>
    )
}