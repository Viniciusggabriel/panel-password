# Dependências

## Desenvolvimento

- tsx - TypeScript com suporte a JSX
- tsup - Ferramenta de build
- typescript - TypeScript
- vitest - Framework de testes
- ZOD - Lib de validação de dados
- Dotenv - Variáveis de ambiente

tsup é usado para fazer o build e gerar os arquivos JavaScript finalizados.

## Produção

Em produção, usamos o processo de build do tsup para reduzir o uso de memória e evitar bugs que poderiam ser causados por dependências de desenvolvimento.

O tsup transpila o código TypeScript para JavaScript puro.

Vitest é usado para testes unitários por ser muito rápido comparado a outras ferramentas.

As dependências de desenvolvimento são instaladas com esbuild para maximizar a performance.

Também tem o ZOD, uma lib para validação de dados. Essa documentação explica as principais dependências do projeto e suas funções, tanto em desenvolvimento quanto em produção.
