SELECT a.id_arquivo from arquivos a, texto t 
where a.id_arquivo = t.id_texto
group by a.id_arquivo having count(*) > 0
ORDER BY a.id_arquivo ASC


SELECT id_arquivo from arquivos where id_arquivo not in (SELECT id_arquivo FROM arquivos, texto
where id_arquivo = id_texto
group by id_arquivo having count(*) > 0)