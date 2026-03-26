package com.order_management_system.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;
import java.time.LocalDate;

@Entity
@Table(name = "produto_perecivel")
@PrimaryKeyJoinColumn(name = "produto_id")
public class ProdutoPerecivel extends Produto {

    @Column(name = "data_validade")
    private LocalDate dataValidade;

    public ProdutoPerecivel() {}

    // 2. Ajuste os Getters e Setters para o novo nome:
    public LocalDate getDataValidade() { 
        return dataValidade; 
    }
    
    public void setDataValidade(LocalDate dataValidade) { 
        this.dataValidade = dataValidade; 
    }
}