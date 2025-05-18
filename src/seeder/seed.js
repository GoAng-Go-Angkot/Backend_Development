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

  // create table
  const dbml = fs.readFileSync('./schema.dbml', 'utf-8');
  const defineTablesSql = exporter.export(dbml, 'postgres');
  await pgClient.query(defineTablesSql);

  // insert route
  const insertRouteSql = `
    INSERT INTO route VALUES
      ('01', '107.9152', '-6.8404', '108.0163', '-6.8220', 'Ciakar - Cimalaka - Paseh'),
      ('02', '107.9152', '-6.8404', '108.1384', '-6.8624', 'Ciakar - Cimalaka - Paseh - Tomo'),
      ('03', '107.9152', '-6.8404', '107.7667', '-6.8647', 'Sumedang - Tanjungsari (via Cadas Pangeran)'),
      ('04', '107.7656', '-6.9317', '107.9152', '-6.8404', 'Cileunyi (Kab. Bandung) - Jatinangor - Sumedang'),
      ('05', '107.7656', '-6.9317', '107.9152', '-6.8404', 'Cileunyi (Kab. Bandung) - Jatinangor - Sumedang'),
      ('06', '107.9152', '-6.8404', '108.0068', '-6.7450', 'Ciakar - Ganeas - Situraja - Cisitu'),
      ('07', '107.9152', '-6.8404', '107.9048', '-6.8521', 'Terminal Ciakar - Padasuka (via Alun-Alun )Sumedang'),
      ('08', '107.9152', '-6.8404', '107.7667', '-6.8647', 'Ciakar - Rancakalong - Pamulihan - Tanjungsari'),
      ('09', '107.9152', '-6.8404', '108.1250', '-6.7478', 'Ciakar - Cimalaka - Paseh - Conggeang - Hariang (Buah Dua)'),
      ('10', '107.9152', '-6.8404', '108.1250', '-6.7478', 'Ciakar - Cimalaka - Paseh - Conggeang - Hariang (Buah Dua)');
  `
  await pgClient.query(insertRouteSql);

  console.log('seed success');
} catch(err) {
  console.log(err);
  console.log('seed fail');
} finally {
  process.exit(1)
}