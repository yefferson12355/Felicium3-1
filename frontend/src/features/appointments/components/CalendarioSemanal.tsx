import React, { useEffect, useState } from 'react';
import { appointmentService } from '../../../core/services/api/appointmentService';

const CalendarioSemanal = ({ onDateTimeSelect, selectedDateTime }) => {
  const [appointments, setAppointments] = useState([]);
  const [weekDates, setWeekDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  // Generar semana actual
  useEffect(() => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    const monday = new Date(today);
    monday.setDate(diff);
    
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      dates.push(new Date(date));
    }
    
    setWeekDates(dates);
    setSelectedDate(dates[0]);
  }, []);

  // Cargar citas
  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const response = await appointmentService.getAll();
        // Manejar ambas estructuras: respuesta directa o con .data
        const data = response?.data || response;
        const appts = data?.appointments || (Array.isArray(data) ? data : []);
        setAppointments(Array.isArray(appts) ? appts : []);
      } catch (err) {
        console.error('Error cargando citas:', err);
        setAppointments([]);
      }
    };

    loadAppointments();
  }, []);

  const horasDia = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30', '18:00'
  ];

  // Verificar si hora está reservada
  const isHourBooked = (date, hour) => {
    return appointments.some(apt => {
      // Estructura del API: { timeSlot: { date: "2025-11-28", startTime: "09:00" } }
      const aptDate = apt.timeSlot?.date || apt.fecha_hora?.split('T')[0];
      const selectedDateStr = date.toISOString().split('T')[0];
      const aptTime = apt.timeSlot?.startTime || apt.time || apt.hora;
      
      return aptDate === selectedDateStr && aptTime === hour;
    });
  };

  const handleHourClick = (date, hour) => {
    if (isHourBooked(date, hour)) return;
    
    onDateTimeSelect?.({
      date: date.toISOString().split('T')[0],
      time: hour,
      fecha: date
    });
  };

  const getNombreDia = (date) => {
    const dias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    return dias[date.getDay()];
  };

  return (
    <div style={{ padding: '15px', backgroundColor: '#fff' }}>
      <h3 style={{ marginTop: 0, marginBottom: '15px', fontSize: '14px', fontWeight: 'bold' }}>
        📅 Selecciona Fecha y Hora
      </h3>

      {/* FECHAS DE LA SEMANA */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px', marginBottom: '20px' }}>
        {weekDates.map((date, idx) => {
          const isSelected = selectedDate?.toDateString() === date.toDateString();
          return (
            <button
              key={idx}
              onClick={() => setSelectedDate(date)}
              style={{
                padding: '8px 4px',
                border: isSelected ? '2px solid #2196f3' : '1px solid #ddd',
                backgroundColor: isSelected ? '#e3f2fd' : '#fff',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '11px',
                fontWeight: isSelected ? '700' : '500',
                color: '#333',
                transition: 'all 0.2s'
              }}
            >
              <div style={{ fontSize: '10px', color: '#666' }}>{getNombreDia(date)}</div>
              <div style={{ fontSize: '12px', fontWeight: 'bold' }}>{date.getDate()}</div>
            </button>
          );
        })}
      </div>

      {/* HORAS */}
      {selectedDate && (
        <div>
          <p style={{ fontSize: '12px', color: '#666', marginBottom: '10px', margin: '0 0 10px 0' }}>
            <strong>Horarios disponibles:</strong>
          </p>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(4, 1fr)', 
            gap: '6px',
            maxHeight: '280px',
            overflowY: 'auto'
          }}>
            {horasDia.map((hora) => {
              const booked = isHourBooked(selectedDate, hora);
              const isSelected = selectedDateTime?.time === hora && 
                                selectedDateTime?.date === selectedDate.toISOString().split('T')[0];
              
              return (
                <button
                  key={hora}
                  onClick={() => handleHourClick(selectedDate, hora)}
                  disabled={booked}
                  style={{
                    padding: '10px',
                    border: isSelected ? '2px solid #4caf50' : booked ? '1px solid #ccc' : '1px solid #ddd',
                    backgroundColor: isSelected ? '#e8f5e9' : booked ? '#f5f5f5' : '#fff',
                    borderRadius: '4px',
                    cursor: booked ? 'not-allowed' : 'pointer',
                    fontSize: '12px',
                    fontWeight: isSelected ? '700' : '500',
                    color: booked ? '#999' : '#333',
                    opacity: booked ? 0.6 : 1,
                    transition: 'all 0.2s'
                  }}
                >
                  {booked ? '❌' : isSelected ? '✓' : hora}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarioSemanal;
