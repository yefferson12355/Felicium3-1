import React, { useState } from 'react';
import CalendarioSemanal from './CalendarioSemanal';

const SolicitarCita = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [citaSolicitada, setCitaSolicitada] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [dentist, setDentist] = useState('');
  const [appointmentType, setAppointmentType] = useState('');
  const [motivo, setMotivo] = useState('');

  // Mock data for calendars and options
  const dentists = ['Dr. Pérez', 'Dra. López', 'Dr. Gómez', 'Dra. Rojas'];
  const appointmentTypes = ['Primera consulta', 'Limpieza', 'Endodoncia', 'Revisión', 'Extracción'];

  const handleConfirmarCita = () => {
    // In a real app, this would make an API call
    console.log('Cita solicitada:', { selectedDate, selectedTime, dentist, appointmentType, motivo });
    setCitaSolicitada(true);
  };

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{
          margin: '0 0 16px 0',
          fontSize: '16px',
          fontWeight: 600,
          color: '#172B4D'
        }}>
          {currentStep === 1 && 'Selecciona horario disponible'}
          {currentStep === 2 && 'Detalles de la cita'}
          {currentStep === 3 && 'Tipo de cita'}
          {currentStep === 4 && 'Confirma tu cita'}
        </h3>

        {/* Step indicator */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          {[1, 2, 3, 4].map((step) => (
            <div key={step} style={{ display: 'flex', alignItems: 'center' }}>
              <div
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: currentStep >= step ? '#0052CC' : '#DFE1E6',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  marginRight: '8px'
                }}
              >
                {step}
              </div>
              {step < 4 && (
                <div
                  style={{
                    height: '2px',
                    backgroundColor: currentStep > step ? '#0052CC' : '#DFE1E6',
                    width: '50px'
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Weekly Calendar */}
        {currentStep === 1 && (
          <div style={{ marginBottom: '20px' }}>
            <CalendarioSemanal
              onDateSelect={(date) => {
                // Format the date to match the expected format
                const formattedDate = date.toISOString().split('T')[0];
                setSelectedDate(formattedDate);
              }}
              selectedDate={selectedDate ? new Date(selectedDate) : null}
              onHourSelect={(hourData) => {
                setSelectedTime(hourData.hour);
              }}
              onTimeSlotClick={() => {
                if (selectedDate && selectedTime) {
                  setCurrentStep(2); // Move to next step after selecting a time slot
                }
              }}
              citasExistentes={[
                // Mock existing appointments to test the functionality
                { fecha: new Date().toISOString().split('T')[0], hora: '10:00' }, // Today at 10am
                { fecha: new Date(Date.now() + 86400000).toISOString().split('T')[0], hora: '14:00' }, // Tomorrow at 2pm
                { fecha: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0], hora: '15:30' }, // In 2 days at 3:30pm
              ]}
            />
            {selectedDate && selectedTime && (
              <div style={{
                backgroundColor: '#E6F7FF',
                padding: '12px',
                borderRadius: '3px',
                border: '1px solid #0052CC',
                textAlign: 'center',
                marginTop: '10px'
              }}>
                Fecha seleccionada: {new Date(selectedDate).toLocaleDateString('es-ES', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })} a las {selectedTime}
              </div>
            )}
          </div>
        )}

        {/* Step 2: Select dentist */}
        {currentStep === 2 && (
          <div style={{ marginBottom: '20px' }}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '4px', color: '#172B4D' }}>Seleccionar dentista</label>
              <select
                value={dentist}
                onChange={(e) => setDentist(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #DFE1E6',
                  borderRadius: '3px'
                }}
              >
                <option value="">Seleccionar dentista</option>
                {dentists.map((d, index) => (
                  <option key={index} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Step 3: Appointment details */}
        {currentStep === 3 && (
          <div style={{ marginBottom: '20px' }}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '4px', color: '#172B4D' }}>Tipo de cita</label>
              <select
                value={appointmentType}
                onChange={(e) => setAppointmentType(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #DFE1E6',
                  borderRadius: '3px'
                }}
              >
                <option value="">Seleccionar tipo</option>
                {appointmentTypes.map((type, index) => (
                  <option key={index} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '4px', color: '#172B4D' }}>Mensaje adicional</label>
              <textarea
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                placeholder="Describe el motivo..."
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #DFE1E6',
                  borderRadius: '3px',
                  minHeight: '80px'
                }}
              />
            </div>
          </div>
        )}

        {/* Step 4: Confirmation */}
        {currentStep === 4 && (
          <div style={{ marginBottom: '20px' }}>
            <div style={{ backgroundColor: '#F4F5F7', padding: '16px', borderRadius: '3px', marginBottom: '16px' }}>
              <div style={{ marginBottom: '8px' }}><strong>Fecha:</strong> {selectedDate ? new Date(selectedDate).toLocaleDateString('es-ES') : 'No seleccionada'}</div>
              <div style={{ marginBottom: '8px' }}><strong>Hora:</strong> {selectedTime || 'No seleccionada'}</div>
              <div style={{ marginBottom: '8px' }}><strong>Dentista:</strong> {dentist || 'No seleccionado'}</div>
              <div style={{ marginBottom: '8px' }}><strong>Tipo:</strong> {appointmentType || 'No seleccionado'}</div>
              <div style={{ marginBottom: '8px' }}><strong>Mensaje:</strong> {motivo || 'No especificado'}</div>
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        {citaSolicitada ? (
          // Success view after submitting appointment
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: '#E6FCBF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px'
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6L9 17L4 12" stroke="#36B37E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 style={{
              fontSize: '20px',
              fontWeight: 600,
              color: '#172B4D',
              marginBottom: '12px'
            }}>
              ¡Cita solicitada con éxito!
            </h3>
            <p style={{
              color: '#6B778C',
              marginBottom: '24px',
              lineHeight: '1.5'
            }}>
              Tu cita ha sido registrada. Recibirás una confirmación en tu correo electrónico.
            </p>
            <button
              onClick={() => {
                // This would redirect to the dashboard in a real app
                // For now, we'll just reset the form
                setSelectedDate('');
                setSelectedTime('');
                setDentist('');
                setAppointmentType('');
                setMotivo('');
                setCurrentStep(1);
                setCitaSolicitada(false);
              }}
              style={{
                padding: '8px 16px',
                backgroundColor: '#0052CC',
                color: 'white',
                border: 'none',
                borderRadius: '3px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Volver al Dashboard
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {currentStep > 1 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: 'transparent',
                  border: '1px solid #0052CC',
                  borderRadius: '3px',
                  color: '#0052CC',
                  cursor: 'pointer'
                }}
              >
                Volver
              </button>
            )}

            {currentStep < 4 && currentStep !== 1 ? (
              <button
                onClick={() => {
                  if (currentStep === 2 && dentist) {
                    setCurrentStep(currentStep + 1);
                  } else if (currentStep === 3 && appointmentType) {
                    setCurrentStep(currentStep + 1);
                  } else {
                    alert('Por favor completa los campos requeridos');
                  }
                }}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#0052CC',
                  color: 'white',
                  border: 'none',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  marginLeft: 'auto'
                }}
              >
                Continuar
              </button>
            ) : currentStep === 3 ? (
              <button
                onClick={() => {
                  if (selectedDate && selectedTime && dentist && appointmentType) {
                    setCurrentStep(4); // Go to confirm step
                  } else {
                    alert('Por favor completa todos los campos requeridos');
                  }
                }}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#0052CC',
                  color: 'white',
                  border: 'none',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  marginLeft: 'auto'
                }}
              >
                Confirmar
              </button>
            ) : currentStep === 4 ? (
              <button
                onClick={handleConfirmarCita}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#0052CC',
                  color: 'white',
                  border: 'none',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  marginLeft: 'auto'
                }}
              >
                Solicitar cita
              </button>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default SolicitarCita;