import React, { useState, useEffect } from 'react';

const Timer = () => {
  // Состояние для секунд, минут и часов
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  
  // Состояние для управления таймером (запущен/остановлен)
  const [isRunning, setIsRunning] = useState(false);
  
  // Используем useEffect для работы с setInterval
  useEffect(() => {
    let interval;
    
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 59) {
            setMinutes((prevMinutes) => {
              if (prevMinutes === 59) {
                setHours((prevHours) => (prevHours + 1) % 24);
                return 0;
              }
              return prevMinutes + 1;
            });
            return 0;
          }
          return prevSeconds + 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    // Очищаем интервал при размонтировании компонента или остановке таймера
    return () => clearInterval(interval);
  }, [isRunning]);

  // Функция для старта и остановки таймера
  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  // Функция для сброса времени
  const resetTimer = () => {
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  };

  return (
    <div style={styles.container}>
      <div style={styles.timeDisplay}>
        <span style={styles.timeText}>
          {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:
          {String(seconds).padStart(2, '0')}
        </span>
      </div>
      <div style={styles.buttonContainer}>
        <button onClick={toggleTimer} style={styles.button}>
          {isRunning ? 'Стоп' : 'Старт'}
        </button>
        {(hours > 0 || minutes > 0 || seconds > 0) && (
          <button onClick={resetTimer} style={styles.button}>
            Сброс
          </button>
        )}
      </div>
    </div>
  );
};

// Стиль для компонента
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
  },
  timeDisplay: {
    marginBottom: '20px',
  },
  timeText: {
    fontSize: '48px',
    fontWeight: 'bold',
    fontFamily: 'Arial, sans-serif',
  },
  buttonContainer: {
    display: 'flex',
    gap: '10px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Timer;
