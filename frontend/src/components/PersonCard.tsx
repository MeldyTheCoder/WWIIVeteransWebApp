import {useState, useEffect} from 'react';
import { Col, Card, Fade, Modal, Badge, Ratio, Button } from 'react-bootstrap';
import IPersonCardProps from './types/IPersonCard';
import WWIIAPIBackend from '../api/Api';
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

const API = new WWIIAPIBackend()

const PersonCard = ({
    id,
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
    onError,
    onEdit
}: IPersonCardProps) => {
    const [animated, setAnimated] = useState<boolean>(false)
    const [asModal, setAsModal] = useState<boolean>(false)
    const [descriptionTruncated, setDescriptionTruncted] = useState<boolean>(true)

    const getFullName = (shortened?: boolean): string => {
        if (shortened) {
            return `${lastName} ${firstName[0] + "."} ${surname && surname[0] + "."}`
        }

        const fullNameString = `${lastName} ${firstName} ${surname || ''}`

        if (!shortened && fullNameString.length >= 100) {
            return getFullName(true)
        }

        return fullNameString
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

    const getTruncatedDescription = (forModal?: boolean): [string, boolean] => {
        const textStringTuncated = description?.slice(0, 50)
        const needsTruncate = textStringTuncated !== description

        if (forModal && descriptionTruncated) {
            return [textStringTuncated + "...", needsTruncate]
        }

        if (forModal && !descriptionTruncated) {
            return [description, needsTruncate]
        }

        if (!forModal && needsTruncate) {
            return [textStringTuncated + "...", needsTruncate]
        }

        return [description, needsTruncate]
    }

    const stringPersonLifespan = `${formattedDate(dateOfBirth)} - ${(dateOfDeath && formattedDate(dateOfDeath)) || '???'} (${getPersonAge()} года)`

    useEffect(() => {
        setAnimated(true)
    }, [])

    const renderContent = (forModal?: boolean) => {
        const [truncatedDescription, descriptionNeedsTruncate] = getTruncatedDescription(forModal)

        return (
            <Card className='person-card_root text-white' bg='dark' onClick={() => setAsModal(true)}>
                <Ratio key={"1x1"} aspectRatio={"1x1"}>
                    <Card.Img 
                        variant="top" 
                        src={photoUrl || 'https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg'} 
                        className='person-card_photoRation'
                    />
                </Ratio>

                <Card.Body>
                    <Card.Title>{getFullName()}</Card.Title>

                    <Card.Text className='person-card_lifspan'>
                        <span className='text-light'>{stringPersonLifespan}</span>
                    </Card.Text>

                    <Card.Text className='person-card_years-of-battle'>
                        {yearsOfBattle?.map(
                            (year: any) => (
                                <Badge bg='secondary' className='mx-1' key={year}>
                                    {year}
                                </Badge>
                            )
                        )}
                    </Card.Text>

                    <hr/>

                    <blockquote className="person-card_description-block blockquote mb-0">
                        <p onClick={() => forModal && setDescriptionTruncted(!descriptionTruncated)}>
                            {truncatedDescription || 'Описания нет :('}
                        </p>

                        { quote &&
                            <footer className="blockquote-footer">
                                {quote}
                            </footer>
                        }
                    </blockquote>
                </Card.Body>
            </Card>
        )
    }


    const renderAsCard = () => (
        <Fade in={animated}>
            {renderContent(false)}
        </Fade>
    )
    
    const handleDelete = () => {
        setAsModal(false)

        if (!id) {
            throw new Error('ID пользователя не указан.')
        }

        API.deleteVeteran(id)
        .then(
            (response) => onDelete?.()
        )
        .catch(
            (error) => onError?.()
        )
    }

    const renderAsModal = () => (
        <Modal show={asModal} onHide={() => setAsModal(false)} className='person-block_modal'>
            <Modal.Body>
                {renderContent(true)}
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-danger' onClick={() => handleDelete()}>Удалить</Button>
            </Modal.Footer>
        </Modal>
    )
    
    return (
        <Col sm={4} className='person-block_root my-2'>
            {renderAsCard()}
            {renderAsModal()}
        </Col>
    )

}

export default PersonCard
