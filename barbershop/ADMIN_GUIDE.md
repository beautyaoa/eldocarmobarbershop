# Guia da equipa — Admin Eldo Carmo Barbershop

Endereço: `https://eldocarmobarbershop.pages.dev/admin.html`  
(ou o domínio final quando estiver activo)

---

## Entrar

1. Abra a página de admin.
2. Introduza a **password da equipa**.
3. (Opcional) marque **Manter sessão iniciada** para não precisar de entrar de novo neste browser.
4. Use o ícone do olho para mostrar / ocultar a password.

Para sair: botão **Sair** no fundo do menu lateral.

---

## Menu lateral

| Secção | Para quê |
|--------|----------|
| **Painel** | Resumo: encomendas pendentes, totais, atalhos |
| **Encomendas** | Lista de pedidos da loja · confirmar / entregar / cancelar |
| **Produtos** | Nomes, preços, descrições, fotos, activo/inactivo |
| **Zonas** | Zonas de entrega em Luanda e taxas (Kz) |
| **Imagens** | Carregar fotos e copiar o link para um produto |

Em telemóvel: toque no ícone ☰ no canto superior esquerdo para abrir o menu.

---

## Encomendas

1. Quando um cliente finaliza a compra no site, a encomenda aparece aqui.
2. Estados:
   - **Pendente** — nova
   - **Confirmada** — já falou com o cliente / preparada
   - **Entregue** — concluída
   - **Cancelada**
3. Use os botões em cada cartão ou o filtro (Todas / Pendentes / …).
4. **Actualizar** recarrega a lista.

### Se uma encomenda “não aparece”

- A loja e o admin têm de estar ligados à **mesma API** (Worker).
- Se a API ainda não estiver configurada, as encomendas ficam só no **browser de quem encomendou** e o admin noutro telemóvel/PC não as vê.
- Depois de o programador definir o `workerUrl` e publicar o Worker, as encomendas ficam centralizadas e visíveis em qualquer dispositivo com login.

---

## Produtos

1. Edite nome, preço (Kz), descrição e caminho/URL da imagem.
2. Desmarque **Activo na loja** para esconder sem apagar.
3. **+ Produto** para adicionar.
4. **Guardar rascunho** — só neste browser.
5. **Publicar na loja** — envia as alterações para o site público (todos os clientes).

Sempre que mudar preços ou stock, use **Publicar na loja**.

---

## Zonas de entrega

- Lista de zonas de Luanda com taxa em Kz.
- O cliente escolhe a zona no checkout; a taxa soma-se ao total.
- Pode activar/desactivar ou ajustar valores e depois **Publicar na loja**.

---

## Imagens

1. Abra **Imagens**.
2. Escolha ficheiros (foto do produto).
3. Quando o envio terminar, clique **Copiar link**.
4. Vá a **Produtos** → cole o link no campo **Imagem**.
5. **Publicar na loja**.

---

## Guardar rascunho vs Publicar na loja

| Acção | O que faz |
|-------|-----------|
| **Guardar rascunho** | Guarda no seu browser. Ainda não muda a loja pública. |
| **Publicar na loja** | Actualiza o catálogo que os clientes vêem. |

Recomendação: editar → Guardar rascunho (se precisar interromper) → Publicar na loja quando estiver pronto.

---

## Segurança

- Não partilhe a password fora da equipa.
- Não publique a password em chats públicos ou no código do site.
- Use **Sair** em computadores partilhados (ou não marque “Manter sessão iniciada”).

---

## Problemas frequentes

| Sintoma | O que fazer |
|---------|-------------|
| Não consigo entrar | Confirmar password com o responsável |
| Encomenda feita mas lista vazia | Ver secção “Se uma encomenda não aparece” acima · pedir ao técnico para confirmar a API |
| Publiquei e a loja não mudou | Hard refresh (Ctrl/Cmd+Shift+R) na loja · esperar 1–2 min |
| Imagem não envia | Verificar ligação à internet · tentar outro ficheiro (JPG/PNG/WebP) |

Para questões técnicas (Worker, domínio, API), contacte quem faz a manutenção do site.
