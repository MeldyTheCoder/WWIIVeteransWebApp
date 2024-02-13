import {useState, useEffect} from 'react';
import { Col, Card, Fade} from 'react-bootstrap';
import IPersonCardProps from './types/IPersonCard';

import './styles/PersonCard.css'

const months: string[] = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря'
]

function getMonthString(month: number): string {
    return months[month]
} 

const PersonCard = ({
    firstName,
    lastName,
    surname,
    description,
    yearsOfBattle,
    quote,
    dateOfBirth,
    dateOfDeath,
    photoUrl,
    onDelete,
    onEdit
}: IPersonCardProps) => {
    const [animated, setAnimated] = useState<boolean>(false)
    const [descriptionTruncated, setDescriptionTruncted] = useState<boolean>(true)

    const getFullName = (shortened?: boolean) => {
        if (shortened) {
            return `${lastName} ${firstName[0] + "."} ${surname && surname[0] + "."}`
        }

        return `${lastName} ${firstName} ${surname || ''}`
    }

    const convertToDate = (date?: string | Date): Date => {
        if (!date) {
            return new Date()
        }

        if (typeof date === 'string') {
            date = new Date(date)
        }

        return date
    }

    const formattedDate = (date: Date | string): string => {
        date = convertToDate(date)
        return `${date.getUTCDate()} ${getMonthString(date.getUTCMonth())} ${date.getUTCFullYear()}`

    }

    const getPersonAge = (): number | null => {
        if (!dateOfDeath) {
            return null
        }

        const dateOfDeathConverted = convertToDate(dateOfDeath)
        const dateOfBirthConverted = convertToDate(dateOfBirth)

        return new Date(dateOfDeathConverted.getTime() - dateOfBirthConverted.getTime()).getUTCFullYear() - 1970
    }

    const getTruncatedDescription = (): [string, boolean] => {
        const textStringTuncated = description?.slice(0, 50)
        const needsTruncate = textStringTuncated !== description

        if (descriptionTruncated && needsTruncate) {
            return [textStringTuncated + "...", needsTruncate]
        }

        return [description, needsTruncate]
    }

    const getYearsOfBattleString = (): string => {
        const yearsSorted = yearsOfBattle?.sort()

        return (yearsSorted && yearsSorted.join(', ')) || 'неизветсны'

    }

    const stringPersonLifespan = `${formattedDate(dateOfBirth)} - ${(dateOfDeath && formattedDate(dateOfDeath)) || '???'} (${getPersonAge()} года)`
    const [truncatedDescription, descriptionNeedsTruncate] = getTruncatedDescription()

    useEffect(() => {
        setAnimated(true)
    }, [])

    return (
        <Col sm={4} className='my-2'>
            <Fade in={animated}>
                <Card className='person-card_root text-white' bg='dark'>
                    <Card.Img 
                        variant="top" 
                        src={photoUrl || 'https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg'} 
                        width="150px"
                        height="400px"
                    />

                    <Card.Body>
                        <Card.Title>{getFullName()}</Card.Title>

                        <Card.Text className='person-card_lifspan'>
                            <span className='text-ligth'>{stringPersonLifespan}</span>
                        </Card.Text>

                        <Card.Text className='person-card_years-of-battle'>
                            Годы сражения: <code className='text-info'>{getYearsOfBattleString()}</code>
                        </Card.Text>

                        <blockquote className="person-card_description-block blockquote mb-0">
                            <p onClick={() => setDescriptionTruncted(!descriptionTruncated)}>
                                {' '}
                                {truncatedDescription || 'Описания нет :('}
                                {' '}
                            </p>
                            { quote &&
                                <footer className="blockquote-footer">
                                    {quote}
                                </footer>
                            }
                        </blockquote>
                    </Card.Body>
                </Card>
            </Fade>
        </Col>
    )

}

export default PersonCard
