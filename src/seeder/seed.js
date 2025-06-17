import pgClient from "../config/pgClient.js";
import process from "process";
import fs  from 'fs';
import { exporter } from '@dbml/core';

try {
  // connect
  await pgClient.connect();

  // reset db
  const resetSql = `
    DO $$
    DECLARE
        r RECORD;
    BEGIN
        FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
            EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(r.tablename) || ' CASCADE;';
        END LOOP;
    END $$;
  `  
  await pgClient.query(resetSql);
  const deleteTypeSchemaSql = 'DROP TYPE IF EXISTS route_number;'
  await pgClient.query(deleteTypeSchemaSql);
  console.log('Database is cleared');

  // create table
  const dbml = fs.readFileSync('./schema.dbml', 'utf-8');
  const defineTablesSql = exporter.export(dbml, 'postgres');
  await pgClient.query(defineTablesSql);
  console.log('New table is created');

  // insert route
  const insertRouteSql = `
    INSERT INTO route VALUES
      ('01', 'Ciakar - Cimalaka - Paseh', '[
        { "long": 107.9100, "lat": -6.8000 },
        { "long": 107.9150, "lat": -6.8050 },
        { "long": 107.9200, "lat": -6.8100 }
      ]'),
      ('02', 'Ciakar - Cimalaka - Paseh - Tomo', '[
        { "long": 107.9050, "lat": -6.8200 },
        { "long": 107.9100, "lat": -6.8250 },
        { "long": 107.9150, "lat": -6.8300 }
      ]'),
      ('03', 'Sumedang - Tanjungsari (via Cadas Pangeran)', '[
        { "long": 107.9300, "lat": -6.8300 },
        { "long": 107.9350, "lat": -6.8350 },
        { "long": 107.9400, "lat": -6.8400 }
      ]'),
      ('04', 'Cileunyi (Kab. Bandung) - Jatinangor - Sumedang', '[
        { "long": 107.9500, "lat": -6.8600 },
        { "long": 107.9550, "lat": -6.8650 },
        { "long": 107.9600, "lat": -6.8700 }
      ]'),
      ('05', 'Cileunyi (Kab. Bandung) - Jatinangor - Sumedang', '[
        { "long": 107.9600, "lat": -6.8700 },
        { "long": 107.9700, "lat": -6.8800 },
        { "long": 107.9800, "lat": -6.8900 }
      ]'),
      ('06', 'Ciakar - Ganeas - Situraja - Cisitu', '[
        { "long": 107.9800, "lat": -6.8900 },
        { "long": 107.9850, "lat": -6.8950 },
        { "long": 107.9900, "lat": -6.9000 }
      ]'),
      ('07', 'Terminal Ciakar - Padasuka (via Alun-Alun ) Sumedang', '[
        { "long": 107.9900, "lat": -6.9000 },
        { "long": 108.0000, "lat": -6.9100 },
        { "long": 108.0100, "lat": -6.9200 }
      ]'),
      ('08', 'Ciakar - Rancakalong - Pamulihan - Tanjungsari', '[
        { "long": 107.9200, "lat": -6.8800 },
        { "long": 107.9250, "lat": -6.8850 },
        { "long": 107.9300, "lat": -6.8900 }
      ]'),
      ('09', 'Ciakar - Cimalaka - Paseh - Conggeang - Hariang (Buah Dua)', '[
        { "long": 107.9400, "lat": -6.9200 },
        { "long": 107.9500, "lat": -6.9300 },
        { "long": 107.9600, "lat": -6.9400 }
      ]'),
      ('10', 'Ciakar - Cimalaka - Paseh - Conggeang - Hariang (Buah Dua)', '[
        { "long": 107.7500, "lat": -6.9500 },  
        { "long": 107.8800, "lat": -6.8350 },
        { "long": 108.1000, "lat": -6.7000 } 
      ]');
  `
  await pgClient.query(insertRouteSql);
  console.log('New route is inserted');

  console.log('Seed Success');
} catch(err) {
  console.log('seed fail');
  console.log(err.message);
} finally {
  process.exit(1)
}