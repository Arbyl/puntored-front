'use client';
import { useState, useEffect } from 'react';
import Loader from '@/components/Loader/Loader';
import styles from './History.module.css';

export default function History() {
  interface Transaction {
    id: string;
    cellPhone: string;
    amount: number;
    supplierId: string;
    transactionalId: string;
    dateTime: string;
  }

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para obtener las transacciones
  const fetchTransactions = async () => {
    try {
      const res = await fetch('https://puntored-sb-d9dvhnfhdvgnaqex.canadacentral-01.azurewebsites.net/transactions');
      const data = await res.json();

      if (res.ok) {
        setTransactions(data);
        setLoading(false);
      } else {
        throw new Error('Error al obtener el historial');
      }
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  if (error) {
    return <p>{`Error: ${error}`}</p>;
  }

  return (
    <div className={styles.container}>
      <h1>Historial de Transacciones</h1>


      {loading ? <Loader /> : (

        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Número de teléfono</th>
              <th className={styles.th}>Valor</th>
              <th className={styles.th}>Proveedor</th>
              <th className={styles.th}>ID de Transacción</th>
              <th className={styles.th}>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className={styles.tr}>
                <td className={styles.td}>{transaction.cellPhone}</td>
                <td className={styles.td}>{transaction.amount}</td>
                <td className={styles.td}>{transaction.supplierId}</td>
                <td className={styles.td}>{transaction.transactionalId}</td>
                <td className={styles.td}>
                  {new Date(transaction.dateTime).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
