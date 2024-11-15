import { useContext, useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import GehrContext from "../../Contexts/Gehr/GehrContext";
import AuthContext from "../../Contexts/Auth/AuthContext";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStopwatch } from '@fortawesome/free-solid-svg-icons/faStopwatch';
import { faClock } from '@fortawesome/free-solid-svg-icons/faClock';
import { faPlay } from '@fortawesome/free-solid-svg-icons/faPlay';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons/faCircleUser';
import { faHeadSideCough } from '@fortawesome/free-solid-svg-icons/faHeadSideCough';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons/faPlusSquare';
import { faPrint } from '@fortawesome/free-solid-svg-icons/faPrint';
import { faShare } from '@fortawesome/free-solid-svg-icons/faShare';
import { faPen } from '@fortawesome/free-solid-svg-icons/faPen';
import { Calendar, dateFnsLocalizer, Event } from 'react-big-calendar'
import moment from 'moment'
import withDragAndDrop, { withDragAndDropProps } from 'react-big-calendar/lib/addons/dragAndDrop';
import { format, parse, startOfWeek, getDay, addHours, startOfHour } from 'date-fns';
import { enUS } from 'date-fns/locale/en-US'

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'

export default function AgendaPage() {

    const authContext = useContext(AuthContext);
    const gehrContext = useContext(GehrContext);

    //const localizer = momentLocalizer(moment);

    const [events, setEvents] = useState<Event[]>([
        {
            title: 'Learn cool stuff',
            start: new Date("2024-11-10T08:00:00"),
            end: new Date("2024-11-10T10:00:00")
        },
    ]);

    const onEventResize: withDragAndDropProps['onEventResize'] = data => {
        const { start, end } = data

        setEvents(currentEvents => {
            const firstEvent = {
                start: new Date(start),
                end: new Date(end),
            }
            return [...currentEvents, firstEvent];
        })
    };

    const onEventDrop: withDragAndDropProps['onEventDrop'] = data => {
        console.log(data)
        const { start, end } = data

        setEvents(currentEvents => {
            const firstEvent = {
                start: new Date(start),
                end: new Date(end),
            }
            return [...currentEvents, firstEvent];
        })
    }

    useEffect(() => {
        authContext.loadUserSession();
    }, []);

    const locales = {
        'en-US': enUS,
    }
    const endOfHour = (date: Date): Date => addHours(startOfHour(date), 1)
    const now = new Date()
    const start = endOfHour(now)
    const end = addHours(start, 2)
    // The types here are `object`. Strongly consider making them better as removing `locales` caused a fatal error
    const localizer = dateFnsLocalizer({
        format,
        parse,
        startOfWeek,
        getDay,
        locales,
    })

    const DnDCalendar = withDragAndDrop(Calendar);

    return (
        <Container>
            <DnDCalendar
                defaultView='week'
                events={events}
                localizer={localizer}
                onEventDrop={onEventDrop}
                onEventResize={onEventResize}
                resizable
                style={{ height: 500 }}
            />
        </Container>
    );
}