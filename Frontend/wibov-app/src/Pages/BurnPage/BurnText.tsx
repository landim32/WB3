export default function BurnText() {
    return (
        <>
            <h1>Como funciona a criação de Tokens?</h1>
            <p>A criação de tokens WB3 é realizada de forma segura, transparente e descentralizada, utilizando a tecnologia de contratos inteligentes e o mecanismo de <strong>Atomic Swaps</strong>.</p>

            <hr />

            <h4>1. Início da Transação</h4>
            <p>
                Para iniciar, o usuário deve preencher o formulário ao lado.
            </p>
            <ul>
                <li>Quantidade de tokens desejada.</li>
                <li>Ativo que será tokenizado.</li>
                <li>Prazo máximo para execução da ordem na Bolsa de Valores Brasileira (B3).</li>
                <li>Valor total em <strong>BUSD</strong> que será utilizado na operação.</li>
            </ul>

            <h4>2. Depósito no Contrato Inteligente</h4>
            <p>
                Após preencher o formulário, o usuário deve depositar os <strong>BUSD</strong> no contrato inteligente vinculado à transação.
                Esses fundos ficarão <strong>locados</strong> no contrato inteligente até que a operação na B3 seja concluída ou o prazo estipulado se encerre.
            </p>

            <h4>3. Execução da Ordem na B3</h4>
            <p>O contrato inteligente automaticamente lança a ordem de compra na B3, utilizando o valor em BUSD depositado.</p>
            <ul>
                <li>Se a ordem de compra for <strong>totalmente cumprida</strong> na B3:
                    <ul>
                        <li>A mesma quantidade de tokens correspondente ao ativo será <strong>locada no contrato inteligente</strong> para o usuário.</li>
                        <li>Qualquer valor residual (troco) que não tenha sido utilizado para a compra também será locado no contrato inteligente.</li>
                    </ul>
                </li>
            </ul>

            <h4>4. Disponibilidade dos Tokens e Troco</h4>
            <p>Assim que a ordem for executada na B3 ou o prazo definido se encerrar, os ativos comprados e/ou o troco serão liberados para saque:</p>
            <ul>
                <li>Os tokens WIBOV estarão disponíveis na carteira do usuário.</li>
                <li>Qualquer valor residual em BUSD (troco) também poderá ser resgatado.</li>
            </ul>

            <h4>5. Ordem Não Executada</h4>
            <p>Se a ordem de compra na B3 não for executada até a data limite estabelecida:</p>
            <ul>
                <li>Todo o valor depositado em <strong>BUSD</strong> será <strong>disponibilizado para saque</strong>.</li>
                <li><strong>Nenhuma taxa</strong> será cobrada neste caso.</li>
            </ul>

            <h4>6. Taxas Aplicáveis</h4>
            <p>
                Se a ordem na B3 for <strong>executada</strong>, seja total ou parcialmente, será aplicada uma taxa de
                <strong>1% sobre o valor total utilizado na transação</strong>. Essa taxa é descontada automaticamente
                antes da liberação dos tokens e do troco.
            </p>
        </>
    );
}