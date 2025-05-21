--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

-- Started on 2025-05-21 10:36:52

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 220 (class 1259 OID 42280)
-- Name: cases; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cases (
    id integer NOT NULL,
    full_name text NOT NULL,
    email text,
    phone text,
    description text,
    status text NOT NULL,
    device_id integer,
    CONSTRAINT cases_status_check CHECK ((status = ANY (ARRAY['cancelled'::text, 'accepted'::text, 'in_progress'::text, 'completed'::text])))
);


ALTER TABLE public.cases OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 42279)
-- Name: cases_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cases_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cases_id_seq OWNER TO postgres;

--
-- TOC entry 4899 (class 0 OID 0)
-- Dependencies: 219
-- Name: cases_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cases_id_seq OWNED BY public.cases.id;


--
-- TOC entry 218 (class 1259 OID 42269)
-- Name: devices; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.devices (
    id integer NOT NULL,
    brand text NOT NULL,
    model text NOT NULL,
    serial_number text NOT NULL,
    warranty_end_date date
);


ALTER TABLE public.devices OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 42268)
-- Name: devices_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.devices_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.devices_id_seq OWNER TO postgres;

--
-- TOC entry 4900 (class 0 OID 0)
-- Dependencies: 217
-- Name: devices_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.devices_id_seq OWNED BY public.devices.id;


--
-- TOC entry 224 (class 1259 OID 42304)
-- Name: part_orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.part_orders (
    id integer NOT NULL,
    part_id integer,
    delivery_date date
);


ALTER TABLE public.part_orders OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 42303)
-- Name: part_orders_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.part_orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.part_orders_id_seq OWNER TO postgres;

--
-- TOC entry 4901 (class 0 OID 0)
-- Dependencies: 223
-- Name: part_orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.part_orders_id_seq OWNED BY public.part_orders.id;


--
-- TOC entry 222 (class 1259 OID 42290)
-- Name: parts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.parts (
    id integer NOT NULL,
    name text NOT NULL,
    device_id integer
);


ALTER TABLE public.parts OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 42289)
-- Name: parts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.parts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.parts_id_seq OWNER TO postgres;

--
-- TOC entry 4902 (class 0 OID 0)
-- Dependencies: 221
-- Name: parts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.parts_id_seq OWNED BY public.parts.id;


--
-- TOC entry 226 (class 1259 OID 42316)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    phone text NOT NULL,
    password text NOT NULL,
    full_name text,
    email text,
    role text DEFAULT 'user'::text
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 42315)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 4903 (class 0 OID 0)
-- Dependencies: 225
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 4716 (class 2604 OID 42283)
-- Name: cases id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cases ALTER COLUMN id SET DEFAULT nextval('public.cases_id_seq'::regclass);


--
-- TOC entry 4715 (class 2604 OID 42272)
-- Name: devices id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.devices ALTER COLUMN id SET DEFAULT nextval('public.devices_id_seq'::regclass);


--
-- TOC entry 4718 (class 2604 OID 42307)
-- Name: part_orders id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.part_orders ALTER COLUMN id SET DEFAULT nextval('public.part_orders_id_seq'::regclass);


--
-- TOC entry 4717 (class 2604 OID 42293)
-- Name: parts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parts ALTER COLUMN id SET DEFAULT nextval('public.parts_id_seq'::regclass);


--
-- TOC entry 4719 (class 2604 OID 42319)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 4887 (class 0 OID 42280)
-- Dependencies: 220
-- Data for Name: cases; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cases (id, full_name, email, phone, description, status, device_id) FROM stdin;
7	Владимир Марданшин	vova_mardanshin@mail.ru	89526160868	нет	accepted	7
8	Владимир Марданшин	vova_mardanshin@mail.ru	89526160868	нет	in_progress	4
\.


--
-- TOC entry 4885 (class 0 OID 42269)
-- Dependencies: 218
-- Data for Name: devices; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.devices (id, brand, model, serial_number, warranty_end_date) FROM stdin;
1	HP	Pavilion 15	HP-12345-RUS	2025-12-01
2	Lenovo	IdeaPad 3	LEN-99871-RUS	2024-09-15
3	ASUS	VivoBook S14	ASU-45678-RUS	2026-01-20
4	Acer	Aspire 7	ACE-76543-RUS	2025-06-30
5	Dell	Inspiron 5510	DEL-11223-RUS	2024-11-10
6	Apple	MacBook Air M1	MAC-2021-RUS	2025-04-25
7	MSI	Modern 14	MSI-14141-RUS	2026-02-12
8	Samsung	Galaxy Book Pro	SAM-88888-RUS	2025-08-05
9	Huawei	MateBook D14	HUA-33333-RUS	2024-12-31
10	Xiaomi	RedmiBook 15	XIA-77777-RUS	2025-07-19
\.


--
-- TOC entry 4891 (class 0 OID 42304)
-- Dependencies: 224
-- Data for Name: part_orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.part_orders (id, part_id, delivery_date) FROM stdin;
1	10	2025-05-22
2	10	2025-05-22
3	14	2025-05-23
\.


--
-- TOC entry 4889 (class 0 OID 42290)
-- Dependencies: 222
-- Data for Name: parts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.parts (id, name, device_id) FROM stdin;
1	Материнская плата HP Pavilion	1
2	Аккумулятор HP	1
3	Клавиатура HP	1
4	Дисплей HP FullHD	1
5	Кулер Lenovo	2
6	SSD 512GB Lenovo	2
7	Шлейф матрицы Lenovo	2
8	Крышка корпуса Lenovo	2
9	Петли экрана ASUS	3
10	Батарея ASUS 42Wh	3
11	Сенсорная панель ASUS	3
12	Камера ноутбука ASUS	3
13	Зарядное устройство Acer	4
14	HDD 1TB Acer	4
15	Материнская плата Acer	4
16	Веб-камера Acer	4
17	Блок питания Dell	5
18	Экран Dell 15.6"	5
19	USB-порт Dell	5
20	Wi-Fi модуль Dell	5
21	Трекпад MacBook Air	6
22	Материнская плата MacBook	6
23	Клавиатура MacBook M1	6
24	Шлейф питания MacBook	6
25	Зарядка MSI 65Вт	7
26	Кулер MSI	7
27	Корпус MSI Modern	7
28	Плата питания MSI	7
29	Матрица Samsung OLED	8
30	Аккумулятор Samsung	8
31	Кнопка включения Samsung	8
32	Шлейф клавиатуры Samsung	8
33	Камера Huawei MateBook	9
34	Клавиатура Huawei	9
35	Батарея Huawei D14	9
36	Материнская плата Huawei	9
37	Кулер Xiaomi RedmiBook	10
38	Материнская плата Xiaomi	10
39	USB-хаб Xiaomi	10
40	Блок питания Xiaomi	10
\.


--
-- TOC entry 4893 (class 0 OID 42316)
-- Dependencies: 226
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, phone, password, full_name, email, role) FROM stdin;
1	89526160868	$2b$10$xoJAnY9hMWJUUBh9xXHlruSaA2ZJqbnTghoADLvLCpS.Ayfcb6DoG	Иванов Сергей Петрович	ivsergpetr@mail.ru	user
2	89001234567	$2b$10$sQ08BhSI/elohNa886zeeu1vBhRzCRe6f/J54KegEChV.qN6aZz2e	Иванов Иван Иванович	ivanov@example.com	user
3	89500603158	$2b$10$JSINdQzB5ZGi30VaSKf23ed9sI/wR5WQ0y4m/hTMdrlaHsYqhymbW	Владимир Марданшин	vova_mardanshin@mail.ru	user
\.


--
-- TOC entry 4904 (class 0 OID 0)
-- Dependencies: 219
-- Name: cases_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cases_id_seq', 8, true);


--
-- TOC entry 4905 (class 0 OID 0)
-- Dependencies: 217
-- Name: devices_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.devices_id_seq', 11, true);


--
-- TOC entry 4906 (class 0 OID 0)
-- Dependencies: 223
-- Name: part_orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.part_orders_id_seq', 3, true);


--
-- TOC entry 4907 (class 0 OID 0)
-- Dependencies: 221
-- Name: parts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.parts_id_seq', 43, true);


--
-- TOC entry 4908 (class 0 OID 0)
-- Dependencies: 225
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 3, true);


--
-- TOC entry 4727 (class 2606 OID 42288)
-- Name: cases cases_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cases
    ADD CONSTRAINT cases_pkey PRIMARY KEY (id);


--
-- TOC entry 4723 (class 2606 OID 42276)
-- Name: devices devices_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.devices
    ADD CONSTRAINT devices_pkey PRIMARY KEY (id);


--
-- TOC entry 4725 (class 2606 OID 42278)
-- Name: devices devices_serial_number_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.devices
    ADD CONSTRAINT devices_serial_number_key UNIQUE (serial_number);


--
-- TOC entry 4731 (class 2606 OID 42309)
-- Name: part_orders part_orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.part_orders
    ADD CONSTRAINT part_orders_pkey PRIMARY KEY (id);


--
-- TOC entry 4729 (class 2606 OID 42297)
-- Name: parts parts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parts
    ADD CONSTRAINT parts_pkey PRIMARY KEY (id);


--
-- TOC entry 4733 (class 2606 OID 42325)
-- Name: users users_phone_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_phone_key UNIQUE (phone);


--
-- TOC entry 4735 (class 2606 OID 42323)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4736 (class 2606 OID 42379)
-- Name: cases cases_device_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cases
    ADD CONSTRAINT cases_device_id_fkey FOREIGN KEY (device_id) REFERENCES public.devices(id) ON DELETE SET NULL;


--
-- TOC entry 4738 (class 2606 OID 42310)
-- Name: part_orders part_orders_part_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.part_orders
    ADD CONSTRAINT part_orders_part_id_fkey FOREIGN KEY (part_id) REFERENCES public.parts(id) ON DELETE CASCADE;


--
-- TOC entry 4737 (class 2606 OID 42298)
-- Name: parts parts_device_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parts
    ADD CONSTRAINT parts_device_id_fkey FOREIGN KEY (device_id) REFERENCES public.devices(id) ON DELETE SET NULL;


-- Completed on 2025-05-21 10:36:52

--
-- PostgreSQL database dump complete
--

