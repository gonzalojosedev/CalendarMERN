import React, { useState }  from 'react';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';



const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  Modal.setAppElement('#root');

  const now = moment().minutes(0).seconds(0).add(1, 'hours');
  const finish = now.clone().add(1, 'hours');

const CalendarModal = () => {

    const [formValues, setFormValues] = useState({
        title: 'Evento',
        notes: '',
        start: now.toDate(),
        end: finish.toDate()
    });

    const {title, notes, start, end} = formValues;

    const handleInputChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name] : e.target.value
        })
        
    }

    const [dateStart, setDateStart] = useState(now.toDate());
    const [dateEnd, setDateEnd] = useState(finish.toDate());    

    const handleStartDateChange = (e) => {
        setDateStart(e)
        setFormValues({
            ...formValues,
            start: e
        })
    }

    

    const handleEndDateChange = (e) => {
        setDateEnd(e);
        setFormValues({
            ...formValues,
            end: e
        })
    }

    const closeModal = ( ) =>{
      //TODO: cerrar modal
    }
    const handleSubmitForm = (e) => {
        e.preventDefault();
        
        const momentStart = moment(start);
        const momentEnd = moment(end);
        
        if(momentStart.isSameOrAfter(momentEnd)) {
            return Swal.fire('Error', 'La fecha de finalización debe ser mayor a la fecha de inicio', 'error')
            
        }
        if(title.trim().length < 2) {
            return Swal.fire('Error' , 'Coloca un título Válido de por lo menos 3 letras', 'error')
        }
        closeModal()

    }

  return <div>
      <Modal
        isOpen={true}
        closeTimeoutMS={200}
        onRequestClose={closeModal}
        style={customStyles}
        className='modal'
        overlayClassName='modal-fondo'

      >
        <h1> Nuevo evento </h1>
        <hr />
        <form 
            className="container"
            onSubmit={handleSubmitForm}
        >

            <div className="form-group">
                <label>Fecha y hora inicio</label>
                <DateTimePicker
                    onChange={handleStartDateChange}
                    value={dateStart}
                    className='form-control'
                />
            </div>

            <div className="form-group">
                <label>Fecha y hora fin</label>
                <DateTimePicker
                    onChange={handleEndDateChange}
                    value={dateEnd}
                    className='form-control'
                    minDate={dateStart}
                />
            </div>

            <hr />
            <div className="form-group">
                <label>Titulo y notas</label>
                <input 
                    type="text" 
                    className="form-control"
                    placeholder="Título del evento"
                    name="title"
                    autoComplete="off"
                    value={title}
                    onChange={handleInputChange}
                />
                <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
            </div>

            <div className="form-group">
                <textarea 
                    type="text" 
                    className="form-control"
                    placeholder="Notas"
                    rows="5"
                    name="notes"
                    value={notes}
                    onChange={handleInputChange}
                ></textarea>
                <small id="emailHelp" className="form-text text-muted">Información adicional</small>
            </div>

            <button
                type="submit"
                className="btn btn-outline-primary btn-block"
            >
                <i className="far fa-save"></i>
                <span> Guardar</span>
            </button>

        </form>
      </Modal>
  </div>;
};

export default CalendarModal;
