package com.order_management_system.backend.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.order_management_system.backend.model.ProdutoPerecivel;

public interface ProdutoPerecivelRepository extends JpaRepository<ProdutoPerecivel, Integer>{
    
    List<ProdutoPerecivel> findByDataValidadeBetween(LocalDate dataInicio, LocalDate dataFim);
    
   
    List<ProdutoPerecivel> findByDataValidadeBefore(LocalDate dataReferencia);
}
