'use client';
import React, { use, useEffect, useState } from 'react';
import styles from './page.module.css'
import Loader from '@/components/Loader/Loader';
interface BuyResponse {
  cellPhone?: string;
  message?: string;
  transactionalID?: string;
  value?: string;
}

const Page = () => {
  const [suppliers, setSuppliers] = useState<{ id: string; name: string }[]>([]);
  const [cellPhone, setCellPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedSupplier, setSelectedSupplier] = useState('default');
  const [error, setError] = useState('');
  const [authToken, setAuthToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [buyResponse, setBuyResponse] = useState<BuyResponse>({});
  const [resultVisible, setResultVisible] = useState(false);


  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch('https://puntored-sb-d9dvhnfhdvgnaqex.canadacentral-01.azurewebsites.net/authenticate');
        const token = await response.text();
        setAuthToken(token);
        console.log('Token:', token);
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };
    fetchToken();
  }, []);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await fetch('https://puntored-sb-d9dvhnfhdvgnaqex.canadacentral-01.azurewebsites.net/getSuppliers');
        const data = await response.json();
        setSuppliers(data);
      } catch (error) {
        console.error('Error fetching suppliers:', error);
      }
    };
    fetchSuppliers();
  }, []);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError('');
      }, 4000);
    }
  }, [error]);


  const validateFields = () => {
    if (!cellPhone || !amount || !selectedSupplier) {
      setError('Por favor, complete todos los campos');
      return false;
    }
    if (!/^\d{10}$/.test(cellPhone)) {
      setError('El número de teléfono debe tener 10 dígitos');
      return false;
    }
    //regex de monto entre 1000 y 100000
    if (!/^(?:[1-9]\d{3,4}|100000)$/.test(amount)) {
      setError('El monto debe ser entre 1000 y 100000');
      return false
    }

    //regex que el numero de telefono empiece con 3
    if (!/^3/.test(cellPhone)) {
      setError('El número de teléfono debe empezar con 3');
      return false;
    }

    if (selectedSupplier === 'default') {
      setError('Por favor, seleccione un operador');
      return false;
    }

    return true;
  }


  const handleSentForm = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    setError('');

    if (!validateFields()) {
      setLoading(false);
      return;
    }

    try {
      console.log('authToken:', authToken);
      const response = await fetch('https://puntored-sb-d9dvhnfhdvgnaqex.canadacentral-01.azurewebsites.net/buy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${authToken}`,
        },
        body: JSON.stringify({
          cellPhone,
          value: parseInt(amount),
          supplierId: selectedSupplier
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }else{
        setResultVisible(true);
        setBuyResponse(data);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error en la recarga:', error);
      setError('Error al procesar la recarga, intentelo nuevamente');
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Módulo Recargas</h1>
      <section className={styles.formContainer}>
        <form onSubmit={handleSentForm} className={styles.form}>
          <div className={styles.formItem}>
            <label htmlFor="cellPhone">Número de teléfono</label>
            <input
              type="text"
              id="cellPhone"
              value={cellPhone}
              onChange={(e) => setCellPhone(e.target.value)}
              required
              className={styles.inputField}
              placeholder='3XXXXXXXXX'
            />
          </div>
          <div className={styles.formItem}>
            <label htmlFor="amount">Monto</label>
            <input
              type="number"
              id="amount"
              name="amount"
              className={styles.inputField}
              placeholder='1000'
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div className={styles.formItem}>
            <label htmlFor="operador">Operador</label>
            <select
              id="operador"
              name="operador"
              value={selectedSupplier} 
              onChange={(e) => setSelectedSupplier(e.target.value)}
              className={styles.inputField}
            >
              <option value="default" disabled>Selecciona un operador</option>
              {suppliers.map((supplier, index) => (
                <option key={index} value={supplier.id}>{supplier.name}</option>  // Usar ID como valor
              ))}
            </select>

          </div>

          <button type="submit" disabled={loading} className={loading ? styles.submitDisabled : styles.submitBtn}>Recargar</button>
        </form>
      </section>

      {loading && <Loader />}

      {resultVisible && (
        <div className={styles.resultContainer}>
          <div className={styles.resultInnexBox}>
            <p className={styles.title}>{buyResponse.message}</p>
            <p className={styles.resultItem}>Telefono: <span className={styles.resultValue}>{buyResponse.cellPhone}</span></p>
            <p className={styles.resultItem}>Valor: <span className={styles.resultValue}>{buyResponse.value}</span></p>
            <p className={styles.resultItem}>Id de transacción: <span className={styles.resultValue}>{buyResponse.transactionalID}</span></p>
            <button className={styles.submitBtn} onClick={() => setResultVisible(false)}>Aceptar</button>
          </div>
        </div>
      )}

      {error && <p className={styles.error}>{error}</p>}
    </div>
  )
}

export default Page;
