PGDMP  4                
    |            fabrica    16.4    16.4                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                        0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            !           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            "           1262    41148    fabrica    DATABASE     ~   CREATE DATABASE fabrica WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Portuguese_Brazil.1252';
    DROP DATABASE fabrica;
                postgres    false                        3079    41149    pgcrypto 	   EXTENSION     <   CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;
    DROP EXTENSION pgcrypto;
                   false            #           0    0    EXTENSION pgcrypto    COMMENT     <   COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';
                        false    2            �            1259    41194    estoque    TABLE     �   CREATE TABLE public.estoque (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    nome character varying(50) NOT NULL,
    quantidade integer NOT NULL,
    fabricante character varying(50) NOT NULL,
    tipo character varying(50) NOT NULL
);
    DROP TABLE public.estoque;
       public         heap    postgres    false            �            1259    41186 
   inpestores    TABLE     �   CREATE TABLE public.inpestores (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    nome character varying(50) NOT NULL,
    email character varying(50) NOT NULL,
    telefone character varying(50) NOT NULL
);
    DROP TABLE public.inpestores;
       public         heap    postgres    false            �            1259    41200    producao    TABLE     k  CREATE TABLE public.producao (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    renavam character varying(50) NOT NULL,
    modelo character varying(50) NOT NULL,
    motor_id uuid NOT NULL,
    carcaca_id uuid NOT NULL,
    kitpneu_id uuid NOT NULL,
    status character varying(50),
    data_fabricacao timestamp without time zone,
    inpestores_id uuid
);
    DROP TABLE public.producao;
       public         heap    postgres    false                      0    41194    estoque 
   TABLE DATA           I   COPY public.estoque (id, nome, quantidade, fabricante, tipo) FROM stdin;
    public          postgres    false    217   �                 0    41186 
   inpestores 
   TABLE DATA           ?   COPY public.inpestores (id, nome, email, telefone) FROM stdin;
    public          postgres    false    216   �                 0    41200    producao 
   TABLE DATA           �   COPY public.producao (id, renavam, modelo, motor_id, carcaca_id, kitpneu_id, status, data_fabricacao, inpestores_id) FROM stdin;
    public          postgres    false    218   �       �           2606    41199    estoque estoque_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.estoque
    ADD CONSTRAINT estoque_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.estoque DROP CONSTRAINT estoque_pkey;
       public            postgres    false    217            �           2606    41193    inpestores inpestores_email_key 
   CONSTRAINT     [   ALTER TABLE ONLY public.inpestores
    ADD CONSTRAINT inpestores_email_key UNIQUE (email);
 I   ALTER TABLE ONLY public.inpestores DROP CONSTRAINT inpestores_email_key;
       public            postgres    false    216            �           2606    41191    inpestores inpestores_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.inpestores
    ADD CONSTRAINT inpestores_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.inpestores DROP CONSTRAINT inpestores_pkey;
       public            postgres    false    216            �           2606    41205    producao producao_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.producao
    ADD CONSTRAINT producao_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.producao DROP CONSTRAINT producao_pkey;
       public            postgres    false    218            �           2606    41211 !   producao producao_carcaca_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.producao
    ADD CONSTRAINT producao_carcaca_id_fkey FOREIGN KEY (carcaca_id) REFERENCES public.estoque(id) ON DELETE CASCADE;
 K   ALTER TABLE ONLY public.producao DROP CONSTRAINT producao_carcaca_id_fkey;
       public          postgres    false    217    218    4740            �           2606    41221 $   producao producao_inpestores_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.producao
    ADD CONSTRAINT producao_inpestores_id_fkey FOREIGN KEY (inpestores_id) REFERENCES public.inpestores(id) ON DELETE CASCADE;
 N   ALTER TABLE ONLY public.producao DROP CONSTRAINT producao_inpestores_id_fkey;
       public          postgres    false    218    216    4738            �           2606    41216 !   producao producao_kitpneu_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.producao
    ADD CONSTRAINT producao_kitpneu_id_fkey FOREIGN KEY (kitpneu_id) REFERENCES public.estoque(id) ON DELETE CASCADE;
 K   ALTER TABLE ONLY public.producao DROP CONSTRAINT producao_kitpneu_id_fkey;
       public          postgres    false    4740    217    218            �           2606    41206    producao producao_motor_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.producao
    ADD CONSTRAINT producao_motor_id_fkey FOREIGN KEY (motor_id) REFERENCES public.estoque(id) ON DELETE CASCADE;
 I   ALTER TABLE ONLY public.producao DROP CONSTRAINT producao_motor_id_fkey;
       public          postgres    false    217    4740    218               �  x�UTˎ9<�_�?�@R��;����d��\���F��]ۓ��룶���bQR�Ud+V״�� k)�<6���.X'��i_RIÇy�}V��9X�j>;�
Xt贆̕:G�(F�\9�_��~��Q�V/��)E�͂i�I"�(�NQS� �Rϣ�T9��L?��5q��Ңu� 9V�����1�+V][P��q�/
��K�e^���*D��;�Ć��#�n�I=YXr���RN|��o���0���a��x�� ;�Q�;+e�	E;AL��j�X�*�9�A8$��xhx;�󰝧�8�tL;e���G"����5��}Gט^}|��.-E���o�Q3�E(�u�g`�.Z�����Χ������<�VܙN�U��F�R�M���(	r�=���bp�b��Vղ\
1�9�~?�>
X� ٲ@����?��<����IY��|���5r�S'@�ؚE�^���Y�jz3O5�*Fu�� �� V/�2�SY��"J�oQ�q�lŋ)��Ʊ��{H);�V�S��ft���·���c�,��<�2!�[|����;Cp�����6|,8�Z�Vq����������vT�Ւ]%f+��"�K�g6�l�hcst����?ʳ:�y���1��"PZ�3��s��*jN}���^v�Q�n�%>���j���%�X�            x������ � �         �  x���?�\7�뷧�p�?�DNm��uCQ�a �1v\�F9H.�����b1�0�D~��n�50`�� �,��}�R��˱�����R��5 f�4*��Nֹ� ���8��w���R�,�cE��g�N�z6^0�6ּ���������}���o���_z;Zi�B��V��_;^&����/.˵A����� $J�'��m���ӧ�����A���m��X�f���cג'��T ����7�`����]i\�ʩ���. #D�kL��bT�o;�u�:��vķ�z$��-���B�A�+��Rh�t�:��� =�aIǞ�p-Qr+�ϩ��^.��TU(���̶-��d���+v6l| a���*�:i�HN���	�Z7o�e�<V���R���Qm9$�AK�D�����kmמصK�%U_R�dJ�pej�gk�\�6���Q�D$��廿�!�#R1H��I�<���֔ʄ�ʊ��^`z���V�d��t����/et����hVgv�P�ߞ�=9��D�H�����5(jOf������B�,��ij�9O��\{^�3 Z&������G��9A�Z�BB���v��*4�,8&x��ͱ��e�'���{иo��۟�͉��7��9ӭY�U�V"��DD��߼V��c��rԑc{{[�{d9WNgw[Hi������g��S������k�4T�*�;5}������i     