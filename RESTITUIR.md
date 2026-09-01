# Cómo devolver estudanza.com a como estaba

Después de la gala (02 set. 2026), este documento deja el dominio exactamente
como estaba antes de publicar la landing: redirigiendo a
`https://www.facebook.com/PatriciaCano.Ballet`.

Los pasos son independientes y reversibles. Hazlos en este orden.

## 1. GoDaddy — restituir el reenvío

Panel de DNS de `estudanza.com`:

1. **Borra las 4 `A` con nombre `@`** que apuntan a GitHub:
   `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
2. **Devuelve el `CNAME www`** de `uriartx.github.io.` a `estudanza.com.`
3. **Vuelve a crear el reenvío** (⋯ Acciones → Reenvío) hacia
   `https://www.facebook.com/PatriciaCano.Ballet`, con redirección permanente (301)

GoDaddy recrea solo sus registros `A` de parking (`15.197.225.128` y
`3.33.251.168`) al activar el reenvío. No hace falta añadirlos a mano.

**No toques** las dos `A` de `chat`, los `NS`, el `SOA` ni el
`CNAME _domainconnect`: son de otros servicios y ya estaban antes.

Estado esperado al terminar: 10 registros, los mismos de antes de la gala.

## 2. GitHub — dar de baja el sitio

Con el DNS ya restituido (así nadie queda sin servicio en el intermedio):

```sh
gh repo delete uriartx/estudanza --yes
```

Si prefieres conservar el código y solo apagar la publicación:

```sh
gh api -X DELETE repos/uriartx/estudanza/pages
```

## 3. Comprobar

```sh
curl -sS -o /dev/null -w '%{http_code} -> %{redirect_url}\n' http://estudanza.com
```

Debe responder `301 -> https://www.facebook.com/PatriciaCano.Ballet`.

El DNS tarda hasta 1 hora en propagar. Si aún ves el sitio de la gala,
espera y vuelve a comprobar antes de tocar nada más.

---

## Si en vez de restituir quieres solo cambiar la raíz

Mientras el sitio siga publicado, para que `estudanza.com` vuelva a llevar a
Facebook pero `/grangalaclassique2026` siga funcionando, basta con editar
`index.html` de la raíz: cambia las dos apariciones de
`grangalaclassique2026/` por la URL de Facebook y haz push.

El commit `0536488` ya tiene esa versión exacta:

```sh
git checkout 0536488 -- index.html && git commit -m "Raiz de vuelta a Facebook" && git push
```
