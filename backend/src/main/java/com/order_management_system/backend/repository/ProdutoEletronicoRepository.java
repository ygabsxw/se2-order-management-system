package com.order_management_system.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.order_management_system.backend.model.ProdutoEletronico;

public interface ProdutoEletronicoRepository extends JpaRepository<ProdutoEletronico, Integer>{

    List<ProdutoEletronico> findByVoltagem(String voltagem);
    
}
