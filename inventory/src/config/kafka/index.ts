import { Kafka, logLevel } from 'kafkajs';

const kafka = new Kafka({
  brokers: ['apt-fawn-10381-us1-kafka.upstash.io:9092'],
  ssl: true,
  sasl: {
    mechanism: 'scram-sha-256',
    username: 'YXB0LWZhd24tMTAzODEkxo-XJCGcaU_QTb2I8ThCk3CRAZZ67wfPomSusnMprhk',
    password: 'NTY1NWM4M2UtYTBlYy00ZDMzLThhN2EtZjY2OTgyOTRhMWNm'
  },
  logLevel: logLevel.ERROR,
});

export { kafka }